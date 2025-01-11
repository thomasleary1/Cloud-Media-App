const { createNote, getNotesByUserId, updateNote, deleteNote } = require('../models/noteModel');
const { notesContainerClient } = require('../services/blobService');
const sql = require('mssql');
const config = require('../config');

const createNoteController = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const note = await createNote(userId, title, content);

    const blockBlobClient = notesContainerClient.getBlockBlobClient(`${note.id}.txt`);
    await blockBlobClient.upload(content, content.length);

    const io = req.app.get('socketio');
    io.emit('noteCreated', note);

    res.status(201).json(note);
  } catch (error) {
    console.error('Failed to create note:', error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

const getNotesController = async (req, res) => {
  const notes = await getNotesByUserId(req.userId);
  res.status(200).json(notes);
};

const updateNoteController = async (req, res) => {
  const { noteId, title, content } = req.body;
  const success = await updateNote(noteId, title, content);
  if (success) {
    const io = req.app.get('socketio');
    io.emit('noteUpdated', { noteId, title, content });

    res.status(200).json({ message: 'Note updated' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};

const deleteNoteController = async (req, res) => {
  const { noteId } = req.body;
  const success = await deleteNote(noteId);
  if (success) {
    const io = req.app.get('socketio');
    io.emit('noteDeleted', noteId);

    res.status(200).json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};

module.exports = {
  createNoteController,
  getNotesController,
  updateNoteController,
  deleteNoteController,
};