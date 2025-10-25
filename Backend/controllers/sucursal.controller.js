const Sucursal = require("../models/Sucursal.model.js");

// Obtener todas las sucursales
exports.findAll = (req, res) => {
  Sucursal.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error al obtener las sucursales." });
    } else {
      res.send(data);
    }
  });
};

// Crear una nueva sucursal
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "El contenido no puede estar vacío" });
  }

  const nuevaSucursal = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    estado: 1,
  };

  // 🔍 Validar si el nombre ya existe
  Sucursal.findByNombre(nuevaSucursal.nombre, (err, existingSucursal) => {
    if (err) {
      console.error("Error al verificar sucursal existente:", err);
      return res.status(500).send({ message: "Error al verificar la sucursal" });
    }

    if (existingSucursal) {
      return res.status(400).send({ message: "Ya existe una sucursal con ese nombre" });
    }

    // Crear nueva sucursal si no existe
    Sucursal.create(nuevaSucursal, (err, data) => {
      if (err) {
        console.error("Error al crear sucursal:", err);
        return res.status(500).send({ message: "Error al crear la sucursal" });
      }
      res.send(data);
    });
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
  const nuevoEstado = req.body.estado;

  Sucursal.updateEstado(id, nuevoEstado, (err, data) => {
    if (err) res.status(500).send({ message: "Error al cambiar estado" });
    else res.send({ message: "Estado actualizado" });
  });
};
