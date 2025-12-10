import os
import zipfile

ZIP_NAME = "lambda_worker.zip"

with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as zipf:

    zipf.write("worker_handler.py")

    for root, _, files in os.walk("package"):
        for f in files:
            full = os.path.join(root, f)
            arc = os.path.relpath(full, "package")
            zipf.write(full, arc)

print("Created WORKER zip:", ZIP_NAME)
