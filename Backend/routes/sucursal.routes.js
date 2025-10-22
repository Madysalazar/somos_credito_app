const express = require("express");
const router = express.Router();
const sucursalController = require("../controllers/sucursal.controller.js");

router.get("/", sucursalController.findAll);
router.post("/", sucursalController.create);
router.put("/:id", sucursalController.update);
router.put("/:id/estado", sucursalController.cambiarEstado);

module.exports = router;
