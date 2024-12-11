const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',         // Cambia esto si tu base de datos está en otro servidor
  user: 'root',              // Usuario de tu base de datos
  password: 'password',      // Contraseña de tu base de datos
  database: 'stellar_homes'  // Nombre de tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = db;
