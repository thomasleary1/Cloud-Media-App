const sql = require('mssql');
const config = require('../config');

const saveMediaMetadata = async (userId, originalName, fileName, mimeType, size) => {
  const result = await sql.query`INSERT INTO Media (UserId, OriginalName, FileName, MimeType, Size) OUTPUT INSERTED.* VALUES (${userId}, ${originalName}, ${fileName}, ${mimeType}, ${size})`;
  return result.recordset[0];
};

const getMediaMetadata = async (userId) => {
  const result = await sql.query`SELECT * FROM Media WHERE UserId = ${userId}`;
  return result.recordset;
};

module.exports = {
  saveMediaMetadata,
  getMediaMetadata,
};