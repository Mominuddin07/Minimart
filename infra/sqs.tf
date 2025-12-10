resource "aws_sqs_queue" "order_queue" {
  name = "MiniMartOrderQueue"

  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
}
