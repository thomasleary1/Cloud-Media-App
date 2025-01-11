import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Chart from './Chart';
import Analysis from './Analysis';
import Export from './Export';
import MediaUpload from './mediaUpload';
import MediaList from './mediaList';
import { getNotes } from '../services/noteService';
import { format, parseISO } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);
  const [media, setMedia] = useState([]);
  const [view, setView] = useState('notes');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchNotes();
      fetchMedia();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const notes = await getNotes();
      console.log('Fetched Notes:', notes);
      setNotes(notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/media`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMedia(response.data);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleNoteCreated = (note) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, note];
      console.log('Updated Notes after creation:', updatedNotes);
      return updatedNotes;
    });
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note));
      console.log('Updated Notes after update:', updatedNotes);
      return updatedNotes;
    });
  };

  const handleNoteDeleted = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
      console.log('Updated Notes after deletion:', updatedNotes);
      return updatedNotes;
    });
  };

  const handleMediaUploaded = (newMedia) => {
    setMedia((prevMedia) => [...prevMedia, newMedia]);
  };

  const aggregateNotesByDate = (notes) => {
    const aggregatedData = notes.reduce((acc, note) => {
      if (note.createdAt) {
        const date = format(parseISO(note.createdAt), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
      }
      return acc;
    }, {});

    const result = Object.keys(aggregatedData).map((date) => ({
      date,
      value: aggregatedData[date],
    }));

    console.log('Aggregated Data:', result);
    return result;
  };

  const chartData = aggregateNotesByDate(notes);

  console.log('Chart Data:', chartData);

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        {isAuthenticated && (
          <button className="btn btn-danger logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      {isAuthenticated ? (
        <>
          <div className="navbar">
            <button
              className={view === 'notes' ? 'active' : ''}
              onClick={() => setView('notes')}
            >
              Notes
            </button>
            <button
              className={view === 'media' ? 'active' : ''}
              onClick={() => setView('media')}
            >
              Media
            </button>
          </div>
          <div className="dashboard-content">
            {view === 'notes' ? (
              <>
                <NoteForm onNoteCreated={handleNoteCreated} className="note-form" />
                <NoteList notes={notes} onNoteUpdated={handleNoteUpdated} onNoteDeleted={handleNoteDeleted} className="note-list" />
                <Chart data={chartData} />
                <div className="data-analysis">
                  <Analysis notes={notes} />
                  <Export notes={notes} />
                </div>
              </>
            ) : (
              <>
                <div className="media-upload">
                  <MediaUpload onMediaUploaded={handleMediaUploaded} />
                </div>
                <div className="media-list">
                  <MediaList media={media} />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Dashboard;