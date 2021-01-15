var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var TipoVehiculo = require("../schema/modeloTipoAsistencia");


router.put('/editar/:id', function (req, res) {

  TipoVehiculo.updateOne({ _id: req.params.id }, 
      { $set: req.body },
      function (error, info) {
          if (error) {
              res.json({
                  resultado: false,
                  msg: 'No se pudo modificar el cliente',
                  err
              });
          } else {
              res.json({
                  resultado: true,
                  info: info
              })
          }
      }
  )
  
});

router.post("/recibir", function (req, res) {
    id = req.body._id

    TipoVehiculo
        .find({ _id: id })
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (error) {
            console.log(error);
        });
});




module.exports = router;
