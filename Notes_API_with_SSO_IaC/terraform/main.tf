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
  chart      = "express"
  namespace  = kubernetes_namespace.notes.metadata[0].name

  set {
    name  = "image.repository"
    value = "yourdockerhubuser/notes-api"
  }

  set {
    name  = "image.tag"
    value = "latest"
  }

  set {
    name  = "service.type"
    value = "ClusterIP"
  }
}