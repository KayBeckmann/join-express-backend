const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/database');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Import der Routen
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Datenbankverbindung und Serverstart
const PORT = process.env.PORT || 5000;
db.sync().then(() => {
  console.log('Datenbank verbunden');
  app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
}).catch((err) => console.error('Fehler bei der DB-Verbindung:', err));
