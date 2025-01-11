import React, { useState } from 'react';
import { updateNote, deleteNote } from '../services/noteService';

const NoteList = ({ notes, onNoteUpdated, onNoteDeleted }) => {
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedNote = await updateNote(editingNote.id, title, content);
      onNoteUpdated(updatedNote);
      setEditingNote(null);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      onNoteDeleted(noteId);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="note-list mb-4">
      <h2>Notes</h2>
      {editingNote ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          </div>
          <div className="mb-3">
            <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Update Note</button>
        </form>
      ) : (
        <ul className="list-group">
          {notes.map(note => (
            <li key={note.id} className="list-group-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button className="btn btn-secondary me-2" onClick={() => handleEdit(note)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;