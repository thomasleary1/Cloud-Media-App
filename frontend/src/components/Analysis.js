import React from 'react';

const Analysis = ({ notes }) => {
  const totalNotes = notes.length;
  const averageLength = notes.reduce((acc, note) => acc + note.content.length, 0) / totalNotes;
  const wordCount = notes.reduce((acc, note) => acc + note.content.split(' ').length, 0);

  return (
    <div>
      <h2>Data Analysis</h2>
      <p>Total Notes: {totalNotes}</p>
      <p>Average Note Length: {averageLength.toFixed(2)} characters</p>
      <p>Total Word Count: {wordCount}</p>
    </div>
  );
};

export default Analysis;