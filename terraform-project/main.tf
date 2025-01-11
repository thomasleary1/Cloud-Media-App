# Required Providers
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.4.0"
}

provider "azurerm" {
  features {}
}

# Data Source for Client Configuration
data "azurerm_client_config" "current" {}

# Resource Group
resource "azurerm_resource_group" "project_rg" {
  name     = var.resource_group_name
  location = var.location
}

# Virtual Network and Subnets
resource "azurerm_virtual_network" "project_vnet" {
  name                = "project-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.project_rg.location
  resource_group_name = azurerm_resource_group.project_rg.name
}

resource "azurerm_subnet" "aks_subnet" {
  name                 = "aks-subnet"
  resource_group_name  = azurerm_resource_group.project_rg.name
  virtual_network_name = azurerm_virtual_network.project_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Azure Kubernetes Service (AKS)
resource "azurerm_kubernetes_cluster" "aks_cluster" {
  name                = "project-aks"
  location            = azurerm_resource_group.project_rg.location
  resource_group_name = azurerm_resource_group.project_rg.name
  dns_prefix          = "projectdns"
  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.vm_size
  }
  identity {
    type = "SystemAssigned"
  }
  network_profile {
    network_plugin = "azure"
  }
}

# Azure Container Registry (ACR)
resource "azurerm_container_registry" "project_acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.project_rg.name
  location            = azurerm_resource_group.project_rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Azure Key Vault
resource "azurerm_key_vault" "project_kv" {
  name                = var.key_vault_name
  location            = azurerm_resource_group.project_rg.location
  resource_group_name = azurerm_resource_group.project_rg.name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"
}

# Azure SQL Server
resource "azurerm_mssql_server" "project_sql_server" {
  name                         = var.sql_server_name
  resource_group_name          = azurerm_resource_group.project_rg.name
  location                     = azurerm_resource_group.project_rg.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_username
  administrator_login_password = var.sql_admin_password
}

# Azure SQL Database
resource "azurerm_mssql_database" "project_sql_database" {
  name      = "projectdb"
  server_id = azurerm_mssql_server.project_sql_server.id
  sku_name  = "Basic"
}

# Azure Storage Account
resource "azurerm_storage_account" "project_storage_account" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.project_rg.name
  location                 = azurerm_resource_group.project_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    environment = "production"
  }
}

# Container for Notes
resource "azurerm_storage_container" "notes_container" {
  name                  = var.notes_container_name
  
  container_access_type = "private"
}

# Container for Media
resource "azurerm_storage_container" "media_container" {
  name                  = var.media_container_name
 
  container_access_type = "private"
}