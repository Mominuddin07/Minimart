# MiniMart – Secure Serverless E-commerce Platform
### CMPE 281 Final Project – By **Mohammed Mominuddin**

---

![MiniMart Banner](./assets/minimart_banner.png)

### **Status:** ✅ Finished  

---

## 📌 About

**MiniMart** is a fully serverless e-commerce application built using AWS Cloud and React.  
It demonstrates modern cloud security principles:

- Least Privilege IAM  
- No Hardcoded Credentials  
- Secrets Manager Integration  
- Event-driven Architecture  
- Terraform IaC  
- Tagged & Auditable Cloud Resources  

---

## ✨ Features

- Product listing (DynamoDB)  
- Checkout & Order creation  
- Order processing using SQS  
- Worker Lambda updates order status  
- Audit logging for every event  
- Secure secrets via AWS Secrets Manager  
- Fully automated infrastructure via Terraform  
- React frontend with API integration  

---

## 🏗 Architecture

React Frontend  
↓  
API Gateway (Public)  
↓  
Lambda API (FastAPI)  
↓  
DynamoDB (Products, Orders)  
↓  
SQS Queue (Async orders)  
↓  
Worker Lambda (Processes orders)  
↓  
DynamoDB Audit Logs  

> Secrets are stored in **AWS Secrets Manager** and retrieved securely by Lambda.

---

## 🔐 Security Implementation

### **1. IAM Least Privilege**

#### API Lambda permissions:
- DynamoDB: Scan, GetItem, PutItem  
- SQS: SendMessage  
- Secrets Manager: GetSecretValue  
- CloudWatch Logs  

#### Worker Lambda permissions:
- SQS: ReceiveMessage, DeleteMessage  
- DynamoDB: UpdateItem, GetItem, PutItem  
- Secrets Manager: GetSecretValue  
- CloudWatch Logs  

---

### **2. Removal of Long-Term Credentials**

- No secrets or API keys stored in code  
- Sensitive values stored in **AWS Secrets Manager**  
- Lambda retrieves secrets using IAM at runtime  

---

### **3. Network Segmentation**

- Only API Gateway is public  
- DynamoDB, SQS, Secrets Manager → internal, not internet-exposed  
- Lambda uses IAM authorization for all service interactions  
- Strong logical segmentation for a serverless application  

---

## 🧰 Infrastructure Governance (Terraform)

Terraform manages:

- Lambda functions  
- API Gateway routes  
- SQS queue  
- DynamoDB tables  
- Secrets Manager  
- IAM roles & policies  

### Tagging enforced across all resources:
Project = MiniMart
Owner = Mohammed Mominuddin
Environment = Dev


### GitOps Change Control Workflow:

1. Create feature branch  
2. Modify Terraform / Backend  
3. Push → create Pull Request  
4. Review + merge  
5. Run `terraform plan`  
6. Run `terraform apply`  

Ensures auditability and controlled deployment.

---

## 🧪 Local Setup Instructions

### Clone repository:
git clone https://github.com/Mominuddin07/Minimart.git
cd Minimart


### Frontend Setup (React):
cd frontend
npm install
npm run dev



Update API URL in:

`src/api/api.js`

Set:
const API_BASE_URL = "https://YOUR_API_ID.execute-api.us-west-2.amazonaws.com";



### Deploy Infrastructure (Terraform):
cd infra
terraform init
terraform apply



---

## 🖥 Tech Stack

### Frontend
- React  
- Vite  
- Tailwind CSS  

### Backend
- Python  
- FastAPI  
- Mangum  

### AWS
- Lambda  
- DynamoDB  
- SQS  
- API Gateway  
- CloudWatch Logs  
- Secrets Manager  
- Terraform  

---

## 👤 Author
**Mohammed Mominuddin**  
[LinkedIn](https://www.linkedin.com/in/mohammed-mominuddin)

---

## 📄 License
This project is licensed under the **MIT License**.

---
