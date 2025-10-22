const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sucursalRoutes = require('./routes/sucursal.routes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/sucursales', sucursalRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
