resource "aws_lambda_function" "worker_lambda" {
  function_name = "MiniMartWorkerLambda"

  role    = aws_iam_role.lambda_worker_role.arn
  handler = "worker_handler.handler"
  runtime = "python3.10"
  timeout = 30

  filename         = "${path.module}/lambda_worker.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda_worker.zip")

  lifecycle {
    replace_triggered_by = [
      aws_iam_policy.lambda_worker_policy
    ]
  }

  environment {
    variables = {
      ORDERS_TABLE   = aws_dynamodb_table.orders.name
      AUDIT_TABLE    = aws_dynamodb_table.audit_logs.name
      SECRET_NAME    = aws_secretsmanager_secret.app_secret.name
      FORCE_REDEPLOY = "v200"   # MAKE SURE THIS CHANGES
    }
  }
}

resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn  = aws_sqs_queue.order_queue.arn
  function_name     = aws_lambda_function.worker_lambda.arn
  batch_size        = 1
  enabled           = true
}
