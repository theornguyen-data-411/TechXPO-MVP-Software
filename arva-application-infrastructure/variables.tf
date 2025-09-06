variable "name"   { type = string default = "dw-eks" }
variable "region" { type = string  default = "ap-southeast-1" }

variable "eks_version" { type = string default = "1.29" }
variable "alb_controller_chart_version" { type = string default = "1.7.2" }

variable "mysql_engine_version"  { type = string default = "8.0" }
variable "mysql_instance_class"  { type = string default = "db.r6g.large" }
variable "mysql_read_replicas"   { type = number default = 1 }

variable "redis_engine_version"      { type = string default = "7.1" }
variable "redis_shards"              { type = number default = 2 }   # Shard 1..M
variable "redis_replicas_per_shard"  { type = number default = 1 }
