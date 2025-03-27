# Azure File Uploader (Node.js + Static HTML)

This is a simple file uploader web app using:

- 📦 Node.js (Express) for the backend
- 🌐 HTML + JavaScript for the frontend (served statically)
- ☁️ Azure Blob Storage to store uploaded files
- 🚀 Azure App Service for hosting

---

## 🔧 Requirements

- An [Azure account](https://portal.azure.com)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed
- A Storage Account with a container (e.g. `uploads`)

---

## ⚙️ How to Deploy to Azure

### 1. Login and create resources

```bash
az login
az group create --name demo-rg --location westeurope
az appservice plan create --name demo-plan --resource-group demo-rg --sku B1 --is-linux
az webapp create --resource-group demo-rg --plan demo-plan --name demo-fileup-node --runtime "NODE:18-lts"
```

---

### 2. Set environment variables (replace placeholders)

```bash
az webapp config appsettings set --resource-group demo-rg --name demo-fileup-node --settings \
  AZURE_STORAGE_CONNECTION_STRING="your_connection_string" \
  AZURE_STORAGE_CONTAINER_NAME="uploads"
```

---

### 3. Deploy via Git

```bash
cd demo-azure-fileup-node
git init
git remote add azure <DEPLOYMENT_GIT_URL>
git add .
git commit -m "Initial commit"
git push azure master
```

💡 You can find the Git URL with:
```bash
az webapp deployment source config-local-git --name demo-fileup-node --resource-group demo-rg
```

---

## 🧪 Test the App

Go to:  
`https://demo-fileup-node.azurewebsites.net`  
Upload a file and see the list of uploaded files. They are saved in your Azure Blob Storage container.

---

## 📂 Project Structure

```
backend/
├── routes/
│   └── upload.js       # API for upload and listing
├── frontend/
│   └── build/          # Static HTML served via Express
├── server.js           # Main Express app
├── .env                # (local only - in Azure use app settings)
└── package.json
```

---

## ✅ DONE!

Now you have a fully working File Uploader on Azure App Service with Node.js and Blob Storage! 🎉
