module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.8"

  cluster_name    = "${var.name}-eks"
  cluster_version = var.eks_version
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = local.eks_subnet_ids

  cluster_endpoint_public_access = true

  # Addons chuẩn
  cluster_addons = {
    coredns   = { most_recent = true }
    kube-proxy= { most_recent = true }
    vpc-cni   = { most_recent = true }
  }

  enable_cluster_creator_admin_permissions = true

  eks_managed_node_groups = {
    core = {
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["c5.xlarge"]
      desired_size   = 4
      min_size       = 3
      max_size       = 8
      subnets        = local.eks_subnet_ids
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = { Project = var.name }
}

# IRSA cho AWS Load Balancer Controller
module "irsa_lb_controller" {
  source  = "terraform-aws-modules/eks/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 20.8"

  role_name = "${var.name}-alb-controller"
  attach_load_balancer_controller_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-load-balancer-controller"]
    }
  }
}

# Cài AWS Load Balancer Controller (tạo ALB/NLB cho Ingress/Service)
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = module.eks.cluster_token
  }
}

resource "helm_release" "aws_lb_controller" {
  name             = "aws-load-balancer-controller"
  repository       = "https://aws.github.io/eks-charts"
  chart            = "aws-load-balancer-controller"
  namespace        = "kube-system"
  version          = var.alb_controller_chart_version

  values = [yamlencode({
    clusterName = module.eks.cluster_name
    region      = var.region
    vpcId       = module.vpc.vpc_id
    serviceAccount = {
      create = false
      name   = "aws-load-balancer-controller"
      annotations = {
        "eks.amazonaws.com/role-arn" = module.irsa_lb_controller.iam_role_arn
      }
    }
  })]

  depends_on = [module.eks]
}
