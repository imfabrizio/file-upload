const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const router = express.Router();
const upload = multer();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
    await blockBlobClient.uploadData(file.buffer);
    res.json({ message: 'File uploaded', name: file.originalname });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/files', async (req, res) => {
  try {
    const blobList = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobList.push(blob.name);
    }
    res.json(blobList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
