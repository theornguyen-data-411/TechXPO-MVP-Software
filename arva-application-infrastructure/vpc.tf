module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.1"

  name = "${var.name}-vpc"
  cidr = local.vpc_cidr
  azs  = local.azs

  public_subnets  = local.public_cidrs
  private_subnets = concat(local.eks_private_cidrs, local.data_private_cidrs)

  public_subnet_names  = ["public-a", "public-b"]
  private_subnet_names = ["eks-a", "eks-b", "data-a", "data-b"]

  enable_nat_gateway = true
  single_nat_gateway = true             # 1 NAT GW ở public-a
  create_igw        = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Project = var.name
  }
}

# Chia lại danh sách subnet private theo đúng khu
locals {
  eks_subnet_ids  = slice(module.vpc.private_subnets, 0, 2)
  data_subnet_ids = slice(module.vpc.private_subnets, 2, 4)
}

# VPC Endpoints (để EKS nói chuyện private)
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = module.vpc.vpc_id
  service_name = "com.amazonaws.${var.region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = module.vpc.private_route_table_ids
  tags = { Name = "${var.name}-s3-endpoint" }
}

# Một số Interface endpoints hay dùng cho EKS
locals {
  interface_endpoints = [
    "ecr.api",
    "ecr.dkr",
    "logs",
    "sts",
    "ec2",
    "elasticloadbalancing"
  ]
}
resource "aws_vpc_endpoint" "interfaces" {
  for_each            = toset(local.interface_endpoints)
  vpc_id              = module.vpc.vpc_id
  service_name        = "com.amazonaws.${var.region}.${each.value}"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = local.eks_subnet_ids
  private_dns_enabled = true
  security_group_ids  = [module.vpc.default_security_group_id]
  tags = { Name = "${var.name}-${each.value}-vpce" }
}
