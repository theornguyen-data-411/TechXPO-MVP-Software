output "vpc_id"                { value = module.vpc.vpc_id }
output "public_subnet_ids"     { value = module.vpc.public_subnets }
output "eks_private_subnet_ids"{ value = local.eks_subnet_ids }
output "data_private_subnet_ids" { value = local.data_subnet_ids }

output "eks_cluster_name"      { value = module.eks.cluster_name }
output "eks_cluster_endpoint"  { value = module.eks.cluster_endpoint }
output "node_security_group_id"{ value = module.eks.node_security_group_id }
output "rds_endpoint_writer"   { value = aws_db_instance.mysql_primary.address }
output "rds_endpoints_readers" { value = [for r in aws_db_instance.mysql_replicas : r.address] }
output "redis_primary_endpoint"{ value = aws_elasticache_replication_group.redis.primary_endpoint_address }
output "waf_acl_arn"           { value = aws_wafv2_web_acl.alb.arn }
