provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "notes" {
  metadata {
    name = "notes"
  }
}

resource "helm_release" "notes-api" {
  name       = "notes-api"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "nginx" # Use a valid chart, e.g., nginx
  namespace  = kubernetes_namespace.notes.metadata[0].name

  set = [
    {
      name  = "image.repository"
      value = "yourdockerhubuser/notes-api"
    },
    {
      name  = "image.tag"
      value = "latest"
    },
    {
      name  = "service.type"
      value = "ClusterIP"
    }
  ]
}