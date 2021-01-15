var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var CategoriaIncidente = require("../schema/modeloCategoriaIncidente");

router.post("/insertar", async function (req, res) {

  var categoriaIncidenteNuevo = new CategoriaIncidente({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    image: '/assets/uploads/' + req.file.originalname
  });

  console.log(categoriaIncidenteNuevo);

  categoriaIncidenteNuevo.save()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });

});

module.exports = router;

