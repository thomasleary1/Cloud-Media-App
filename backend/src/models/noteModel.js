const sql = require('mssql');
const config = require('../config');

const createNote = async (userId, title, content) => {
  const result = await sql.query`INSERT INTO Notes (UserId, Title, Content) OUTPUT INSERTED.* VALUES (${userId}, ${title}, ${content})`;
  return result.recordset[0];
};

const getNotesByUserId = async (userId) => {
  const result = await sql.query`SELECT * FROM Notes WHERE UserId = ${userId}`;
  return result.recordset;
};

const updateNote = async (noteId, title, content) => {
  const result = await sql.query`UPDATE Notes SET Title = ${title}, Content = ${content} WHERE Id = ${noteId}`;
  return result.rowsAffected[0] > 0;
};

const deleteNote = async (noteId) => {
  const result = await sql.query`DELETE FROM Notes WHERE Id = ${noteId}`;
  return result.rowsAffected[0] > 0;
};

module.exports = {
  createNote,
  getNotesByUserId,
  updateNote,
  deleteNote,
};