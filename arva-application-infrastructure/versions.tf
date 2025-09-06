terraform {
  required_version = ">= 1.6"
  required_providers {
    aws         = { source = "hashicorp/aws",        version = ">= 5.47" }
    kubernetes  = { source = "hashicorp/kubernetes", version = ">= 2.31" }
    helm        = { source = "hashicorp/helm",       version = ">= 2.11" }
    random      = { source = "hashicorp/random",     version = ">= 3.5" }
  }
}
