const express = require('express');
const { createNoteController, getNotesController, updateNoteController, deleteNoteController } = require('../controllers/noteController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createNoteController);
router.get('/', authenticate, getNotesController);
router.put('/update', authenticate, updateNoteController);
router.delete('/delete', authenticate, deleteNoteController);

module.exports = router;