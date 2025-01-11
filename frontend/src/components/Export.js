import React from 'react';

const Export = ({ notes }) => {
  const handleExport = (format) => {
    let data;
    if (format === 'csv') {
      data = notes.map(note => `${note.id},${note.title},${note.content}`).join('\n');
    } else if (format === 'json') {
      data = JSON.stringify(notes, null, 2);
    }

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-4">
      <h2>Export Data</h2>
      <button className="btn btn-outline-primary me-2" onClick={() => handleExport('csv')}>Export as CSV</button>
      <button className="btn btn-outline-secondary" onClick={() => handleExport('json')}>Export as JSON</button>
    </div>
  );
};

export default Export;