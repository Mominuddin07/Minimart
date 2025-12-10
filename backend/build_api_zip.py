import os
import zipfile

ZIP_NAME = "lambda_api_v2.zip"

with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as z:

    # Add lambda handler
    z.write("lambda_handler.py")

    # Add backend app folder — preserving structure exactly as needed
    for root, dirs, files in os.walk("app"):
        for file in files:
            full_path = os.path.join(root, file)
            z.write(full_path, full_path)  # store path exactly

    # Add dependencies inside package/
    for root, dirs, files in os.walk("package"):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, "package")
            z.write(full_path, rel_path)  # put boto/mangum etc at TOP LEVEL

print(f"Created ZIP: {ZIP_NAME}")
