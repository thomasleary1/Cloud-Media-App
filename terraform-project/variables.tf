variable "resource_group_name" {
  description = "Name of the resource group"
  default     = "advanced-cloud-project"
}

variable "location" {
  description = "Azure region"
  default     = "australiaeast"
}

variable "sql_admin_username" {
  description = "SQL Admin Username"
  default     = "adminuser"
}

variable "sql_admin_password" {
  description = "SQL Admin Password"
  default     = "P@ssw0rd1234"
}

variable "node_count" {
  description = "Number of nodes in the AKS cluster"
  default     = 1 
}

variable "vm_size" {
  description = "VM size for AKS nodes"
  default     = "Standard_D2s_v3"
}

variable "app_gateway_name" {
  description = "Name of the Application Gateway"
  default     = "custom-app-gateway"
}

variable "app_gateway_sku_name" {
  description = "SKU name for the Application Gateway"
  default     = "Standard_v2"
}

variable "app_gateway_sku_tier" {
  description = "SKU tier for the Application Gateway"
  default     = "Standard_v2" 
}

variable "app_gateway_capacity" {
  description = "Capacity for the Application Gateway"
  default     = 1
}

variable "app_gateway_frontend_port" {
  description = "Frontend port for the Application Gateway"
  default     = 80
}

variable "app_gateway_public_ip_name" {
  description = "Name of the public IP for the Application Gateway"
  default     = "custom-app-gateway-public-ip"
}

variable "acr_name" {
  description = "Name of the Azure Container Registry"
  default     = "uniqueprojectacr"
}

variable "key_vault_name" {
  description = "Name of the Azure Key Vault"
  default     = "unique-project-kv"
}

variable "sql_server_name" {
  description = "Name of the Azure SQL Server"
  default     = "unique-project-sql-server"
}

variable "storage_account_name" {
  description = "Name of the Azure Storage Account"
  default     = "uniquestorageacct456"
}

variable "notes_container_name" {
  description = "Name of the container for storing notes"
  default     = "notes"
}

variable "media_container_name" {
  description = "Name of the container for storing media"
  default     = "media"
}