const { BlobServiceClient } = require('@azure/storage-blob');
const config = require('../config');

const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=${config.storageConfig.accountName};AccountKey=${config.storageConfig.accountKey};EndpointSuffix=core.windows.net`
);

const notesContainerClient = blobServiceClient.getContainerClient(config.storageConfig.notesContainer);
const mediaContainerClient = blobServiceClient.getContainerClient(config.storageConfig.mediaContainer);

module.exports = {
  notesContainerClient,
  mediaContainerClient
};