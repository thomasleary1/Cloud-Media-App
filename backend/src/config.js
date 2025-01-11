require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  sqlConfig: {
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    options: {
      encrypt: process.env.SQL_ENCRYPT === 'true'
    }
  },
  storageConfig: {
    accountName: process.env.STORAGE_ACCOUNT_NAME,
    accountKey: process.env.STORAGE_ACCOUNT_KEY,
    notesContainer: process.env.NOTES_CONTAINER_NAME,
    mediaContainer: process.env.MEDIA_CONTAINER_NAME
  }
};