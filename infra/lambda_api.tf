#############################################################
#   MINI-MART API LAMBDA (FORCED REDEPLOY VERSION)
#############################################################

resource "aws_lambda_function" "api_lambda" {
  # IMPORTANT: New function name forces Terraform to recreate Lambda
  function_name = "MiniMartApiLambdaNEW"

  role    = aws_iam_role.lambda_api_role.arn

  # Correct handler for FastAPI + Mangum
  handler = "lambda_handler.lambda_handler"
  runtime = "python3.10"
  timeout = 30

  # IMPORTANT: New zip name to force code redeploy
  filename         = "${path.module}/lambda_api_v2.zip" 
  source_code_hash = filebase64sha256("${path.module}/lambda_api_v2.zip")

  environment {
    variables = {
      SECRET_NAME    = aws_secretsmanager_secret.app_secret.name
      PRODUCTS_TABLE = aws_dynamodb_table.products.name
      ORDERS_TABLE   = aws_dynamodb_table.orders.name
      QUEUE_URL      = aws_sqs_queue.order_queue.id
    }
  }
}
