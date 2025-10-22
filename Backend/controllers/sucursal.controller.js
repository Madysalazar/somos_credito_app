const Sucursal = require("../models/Sucursal.model.js");

exports.findAll = (req, res) => {
  Sucursal.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error al obtener las sucursales." });
    } else {
      res.send(data); // Devuelve todas las sucursales
    }
  });
};

// Crear una nueva sucursal
exports.create = (req, res) => {
  if (!req.body) {
   return res.status(400).send({ message: "El contenido no puede estar vacío" });
    return;
  }

  const nuevaSucursal = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    estado: 1,
  };

  Sucursal.create(nuevaSucursal, (err, data) => {
    if (err) {
      console.error("Error al crear sucursal:", err);
      return res.status(500).send({ message: "Error al crear la sucursal" });
    }
    res.send(data);
  });
};

// Actualizar sucursal
exports.update = (req, res) => {
  const id = req.params.id;
  Sucursal.update(id, req.body, (err, data) => {
    if (err)
      res.status(500).send({ message: "Error al actualizar la sucursal." });
    else res.send(data);
  });
};

// Cambiar estado (alta/baja)
exports.cambiarEstado = (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado; // 1 = alta, 0 = baja

  Sucursal.updateEstado(id, nuevoEstado, (err, data) => {
    if (err) res.status(500).send({ message: "Error al cambiar estado" });
    else res.send({ message: "Estado actualizado" });
  });
};