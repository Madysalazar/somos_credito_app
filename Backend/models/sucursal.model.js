const db = require('../config/db.config.js');
const Sucursal = {};

// Obtener todas las sucursales
Sucursal.getAll = (result) => {
  db.query("SELECT * FROM Sucursal", (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};

// Buscar sucursal por nombre
Sucursal.findByNombre = (nombre, result) => {
  db.query("SELECT * FROM Sucursal WHERE nombre = ?", [nombre], (err, res) => {
    if (err) {
      console.error("❌ Error al buscar sucursal por nombre:", err);
      result(err, null);
      return;
    }

    // Si encuentra resultados
    if (res.length > 0) {
      result(null, res[0]);
    } else {
      result(null, null);
    }
  });
};

// Crear sucursal
Sucursal.create = (data, result) => {
  db.query("INSERT INTO Sucursal SET ?", data, (err, res) => {
    if (err) {
      console.error("❌ Error al crear sucursal:", err);
      result(err, null);
      return;
    }
    console.log("✅ Sucursal creada:", { id: res.insertId, ...data });
    result(null, { id: res.insertId, ...data });
  });
};

// Actualizar sucursal
Sucursal.update = (id, data, result) => {
  db.query("UPDATE Sucursal SET ? WHERE idSucursal = ?", [data, id], (err, res) => {
    if (err) {
      console.error("❌ Error al actualizar sucursal:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Cambiar estado
Sucursal.updateEstado = (id, estado, result) => {
  db.query(
    "UPDATE Sucursal SET estado = ? WHERE idSucursal = ?",
    [estado, id],
    (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    }
  );
};

module.exports = Sucursal;
