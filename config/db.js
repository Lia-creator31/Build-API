const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',    // Ganti dengan host database kamu
  user: 'root',         // Ganti dengan username database kamu
  password: '',         // Ganti dengan password database kamu
  database: 'my_store'  // Ganti dengan nama database kamu
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
