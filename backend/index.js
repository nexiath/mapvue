const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'rcassard',
  password: 'admin',
  database: 'BDD_rcassard'
});

db.connect(err => {
  if (err) {
    console.error('Could not connect to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
      if(err) return res.status(500).json({ message: 'Erreur du serveur!' });
      
      if(results.length > 0) {
        const user = results[0];
        if(bcrypt.compareSync(password, user.password_hash)) {
          return res.json({ message: 'Vous êtes maintenant connecté!' });
        }
      }
      
      return res.status(401).json({ message: 'Votre mot de passe ou votre nom d’utilisateur est incorrect!' });
    });
  });

app.get('/reservations', (req, res) => {
  const sql = 'SELECT * FROM reservations';
  db.query(sql, (err, results) => {
    if(err) return res.status(500).json({ message: 'Erreur du serveur!' });
    res.json(results);
  });
});

app.post('/reserve', (req, res) => {
  const { type, reservation_id, username } = req.body;
  const sqlCheck = 'SELECT * FROM reservations WHERE type = ? AND reservation_id = ?';
  db.query(sqlCheck, [type, reservation_id], (err, results) => {
    if(err) return res.status(500).json({ message: 'Erreur du serveur!' });

    if(results.length === 0) {
      const sqlInsert = 'INSERT INTO reservations (type, reservation_id, username) VALUES (?, ?, ?)';
      db.query(sqlInsert, [type, reservation_id, username], err => {
        if(err) return res.status(500).json({ message: 'Erreur du serveur!' });
        res.json({ message: 'Réservation effectuée avec succès!' });
      });
    } else {
      res.status(400).json({ message: 'Cet emplacement est déjà réservé!' });
    }
  });
});

app.delete('/reserve', (req, res) => {
  const { type, reservation_id, username } = req.body;
  const sqlCheck = 'SELECT * FROM reservations WHERE type = ? AND reservation_id = ? AND (username = ? OR ? = "admin")';
  db.query(sqlCheck, [type, reservation_id, username, username], (err, results) => {
    if(err) return res.status(500).json({ message: 'Erreur du serveur!' });

    if(results.length > 0) {
      const sqlDelete = 'DELETE FROM reservations WHERE type = ? AND reservation_id = ?';
      db.query(sqlDelete, [type, reservation_id], err => {
        if(err) return res.status(500).json({ message: 'Erreur du serveur!' });
        res.json({ message: 'Réservation supprimée avec succès!' });
      });
    } else {
      res.status(400).json({ message: 'Suppression non autorisée ou réservation inexistante!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.on('close', () => {
  db.end();
});
