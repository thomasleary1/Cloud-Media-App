const express = require('express');
const { upload, uploadMedia, getMedia } = require('../controllers/mediaController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), uploadMedia);
router.get('/', authenticate, getMedia);

module.exports = router;