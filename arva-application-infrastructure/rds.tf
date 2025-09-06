# SG cho MySQL chỉ cho phép từ Node SG của EKS
resource "aws_security_group" "db" {
  name        = "${var.name}-mysql-sg"
  description = "Allow MySQL from EKS nodes"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description     = "MySQL from EKS nodes"
    from_port       = 3306
    to_port         = 3306
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

resource "aws_db_subnet_group" "db" {
  name       = "${var.name}-db-subnets"
  subnet_ids = local.data_subnet_ids
  tags       = { Project = var.name }
}

# Primary (Multi-AZ ~ Master/Standby)
resource "random_password" "db" {
  length  = 20
  special = true
}

resource "aws_db_instance" "mysql_primary" {
  identifier             = "${var.name}-mysql-primary"
  engine                 = "mysql"
  engine_version         = var.mysql_engine_version
  instance_class         = var.mysql_instance_class
  allocated_storage      = 100
  storage_type           = "gp3"
  username               = "admin"
  password               = random_password.db.result
  db_name                = "appdb"

  multi_az               = true
  db_subnet_group_name   = aws_db_subnet_group.db.name
  vpc_security_group_ids = [aws_security_group.db.id]

  backup_retention_period    = 7
  deletion_protection        = false
  skip_final_snapshot        = true
  auto_minor_version_upgrade = true

  monitoring_interval = 60
  performance_insights_enabled = true

  publicly_accessible = false
  apply_immediately   = true
  tags = { Project = var.name }
}

# Read Replicas (1..N)
resource "aws_db_instance" "mysql_replicas" {
  count                   = var.mysql_read_replicas
  identifier              = "${var.name}-mysql-read-${count.index}"
  replicate_source_db     = aws_db_instance.mysql_primary.id
  engine                  = "mysql"
  instance_class          = var.mysql_instance_class
  db_subnet_group_name    = aws_db_subnet_group.db.name
  vpc_security_group_ids  = [aws_security_group.db.id]
  publicly_accessible     = false
  auto_minor_version_upgrade = true
  apply_immediately       = true
  tags = { Project = var.name }
}
