const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { saveMediaMetadata, getMediaMetadata } = require('../models/mediaModel');
const { mediaContainerClient } = require('../services/blobService');
const sql = require('mssql');
const config = require('../config');

const uploadsDir = path.join(__dirname, '../../uploads');


if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, filename, mimetype, size } = req.file;
    const userId = req.userId;

    console.log('Uploading file to blob storage:', filename);
    const blockBlobClient = mediaContainerClient.getBlockBlobClient(filename);
    await blockBlobClient.uploadFile(req.file.path);

    console.log('Saving media metadata to database');
    const media = await saveMediaMetadata(userId, originalname, filename, mimetype, size);

    console.log('Media metadata saved:', media);
    res.status(201).json(media);
  } catch (error) {
    console.error('Failed to upload media:', error);
    res.status(500).json({ message: 'Failed to upload media' });
  }
};

const getMedia = async (req, res) => {
  try {
    const media = await getMediaMetadata(req.userId);
    res.status(200).json(media);
  } catch (error) {
    console.error('Failed to get media:', error);
    res.status(500).json({ message: 'Failed to get media' });
  }
};

module.exports = {
  upload,
  uploadMedia,
  getMedia,
};