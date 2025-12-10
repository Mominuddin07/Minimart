resource "aws_secretsmanager_secret" "app_secret" {
  name        = "MiniMartAppSecret"
  description = "Application-level secrets"
}

resource "aws_secretsmanager_secret_version" "app_secret_value" {
  secret_id     = aws_secretsmanager_secret.app_secret.id
  secret_string = jsonencode({ key = "value" })
}
