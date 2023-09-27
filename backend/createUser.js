const bcrypt = require('bcrypt');
const mysql = require('mysql');

const password = "admin"; // remplacez par le mot de passe que vous voulez
const username = "admin"; // remplacez par le nom d'utilisateur que vous voulez

const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(password, saltRounds);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'rcassard', // Votre utilisateur MySQL
  password: '1206',  // Votre mot de passe MySQL
  database: 'BDD_rcassard' // Votre base de données
});

db.connect(err => {
  if(err) return console.error('Could not connect to database:', err);

  const sql = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, results) => {
    if(err) return console.error('Could not insert user:', err);
    console.log('User inserted:', results);
    db.end();
  });
});
