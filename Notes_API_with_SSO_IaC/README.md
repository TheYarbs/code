# Notes API with SSO - Kubernetes + Terraform

## 🛠 Stack
- Node.js Express API
- Keycloak SSO (OIDC)
- Kubernetes (Minikube)
- Terraform + Helm

## 🚀 How to Deploy

1. Start Minikube:
```bash
minikube start --driver=docker
```

2. Enable Ingress:
```bash
minikube addons enable ingress
```

3. Apply Terraform:
```bash
cd terraform
terraform init
terraform apply
```

4. Build and push your Docker image:
```bash
docker build -t yourdockerhubuser/notes-api:latest ./app
docker push yourdockerhubuser/notes-api:latest
```

5. Set up Keycloak with a realm and client (`notes-app`) to match the OIDC settings in `index.js`.

6. Open your app in the browser via Minikube ingress or `kubectl port-forward`.

## 🔒 Auth
SSO powered by Keycloak. You'll be redirected to login before accessing the API.

## 🧪 Notes
Make sure the OIDC URLs match your Keycloak settings and that it's reachable in the cluster.

## 👤 Author
You, a future Infrastructure Pro!