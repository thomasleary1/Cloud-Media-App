import React, { useState } from 'react';
import { createNote } from '../services/noteService';

const NoteForm = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const note = await createNote(title, content);
      onNoteCreated(note);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form mb-4">
      <div className="mb-3">
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div className="mb-3">
        <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Create Note</button>
    </form>
  );
};

export default NoteForm;