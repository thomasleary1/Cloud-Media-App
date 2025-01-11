const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const config = require('./config');
const sql = require('mssql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://1.1.1.1', // Update this
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

app.use(cors({
  origin: 'http://1.1.1.1', // Update this
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/media', mediaRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('socketio', io);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

sql.connect(config.sqlConfig)
  .then(() => console.log('Connected to SQL Database'))
  .catch(err => console.error('Failed to connect to SQL Database:', err));