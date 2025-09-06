provider "aws" {
  region = var.region
}

data "aws_availability_zones" "this" {
  state = "available"
}

locals {
  # Lấy 2 AZ đầu tiên
  azs = slice(data.aws_availability_zones.this.names, 0, 2)

  # CIDR theo sơ đồ, chia /20 thành 2 /21
  vpc_cidr          = "10.100.0.0/16"
  public_cidrs      = ["10.100.0.0/21",  "10.100.8.0/21"]    # từ 10.100.0.0/20
  eks_private_cidrs = ["10.100.16.0/21", "10.100.24.0/21"]   # từ 10.100.16.0/20
  data_private_cidrs= ["10.100.32.0/21", "10.100.40.0/21"]   # từ 10.100.32.0/20
}
