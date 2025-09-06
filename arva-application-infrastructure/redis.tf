# SG cho Redis từ EKS
resource "aws_security_group" "redis" {
  name        = "${var.name}-redis-sg"
  description = "Allow Redis from EKS nodes"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description     = "Redis from EKS nodes"
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [module.eks.node_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = { Project = var.name }
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "${var.name}-redis-subnets"
  subnet_ids = local.data_subnet_ids
  tags       = { Project = var.name }
}

resource "aws_elasticache_replication_group" "redis" {
  replication_group_id          = "${var.name}-redis"
  description                   = "Caching DB - Redis cluster mode"
  engine                        = "redis"
  engine_version                = var.redis_engine_version
  parameter_group_name          = "default.redis7.cluster.on"
  port                          = 6379
  automatic_failover_enabled    = true
  multi_az_enabled              = true
  at_rest_encryption_enabled    = true
  transit_encryption_enabled    = true
  security_group_ids            = [aws_security_group.redis.id]
  subnet_group_name             = aws_elasticache_subnet_group.redis.name

  cluster_mode {
    num_node_groups         = var.redis_shards               # Shard 1..M
    replicas_per_node_group = var.redis_replicas_per_shard   # 0..n
  }

  tags = { Project = var.name }
}