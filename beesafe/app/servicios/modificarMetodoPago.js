var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var modificarMetodoPago = require("../schema/modeloMetodoPago");


router.put('/editar/:id', function (req, res) {

  modificarMetodoPago.updateOne({ _id: req.params.id }, 
      { $set: req.body },
      function (error, info) {
          if (error) {
              res.json({
                  resultado: false,
                  msg: 'No se pudo el metodo de pago',
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

    modificarMetodoPago
        .find({ _id: id })
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (error) {
            console.log(error);
        });
});




module.exports = router;
