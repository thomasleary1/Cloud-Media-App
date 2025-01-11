output "aks_cluster_name" {
  description = "Name of the AKS Cluster"
  value       = azurerm_kubernetes_cluster.aks_cluster.name
}

output "acr_login_server" {
  description = "Azure Container Registry Login Server"
  value       = azurerm_container_registry.project_acr.login_server
}

output "sql_database_connection_string" {
  description = "Connection string for the SQL Database"
  value       = format(
    "Server=tcp:%s.database.windows.net,1433;Initial Catalog=%s;Persist Security Info=False;User ID=%s;Password=%s;",
    azurerm_mssql_server.project_sql_server.name,
    azurerm_mssql_database.project_sql_database.name,
    var.sql_admin_username,
    var.sql_admin_password
  )
}

output "storage_account_name" {
  description = "Name of the Azure Storage Account"
  value       = azurerm_storage_account.project_storage_account.name
}

output "notes_container_name" {
  description = "Name of the container for storing notes"
  value       = azurerm_storage_container.notes_container.name
}

output "media_container_name" {
  description = "Name of the container for storing media"
  value       = azurerm_storage_container.media_container.name
}