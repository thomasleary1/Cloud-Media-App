const sql = require('mssql');
const config = require('./config');

async function testConnection() {
  try {
    await sql.connect(config.sqlConfig);
    console.log('Connected to SQL Database');
  } catch (err) {
    console.error('Failed to connect to SQL Database:', err);
  }
}

testConnection();