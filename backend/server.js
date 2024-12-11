const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const inmuebleRoutes = require('./routes/inmuebleRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Para manejar JSON en el cuerpo de la petición

// Rutas
app.use('/api', inmuebleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
