provider "azurerm" {
  features = {}
}

resource "azurerm_resource_group" "tic_tac_toe" {
  name     = "tic-tac-toe-rg"
  location = "East US"  # Change this to your desired region
}
