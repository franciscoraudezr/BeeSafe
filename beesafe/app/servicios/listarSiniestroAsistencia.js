var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const SiniestroAsistencia = require('../schema/modeloSiniestroAsistencia')


router.get("/recibir", function (req, res) {

  SiniestroAsistencia.find()
    .exec()

    .then(function (result) {
      res.json(result);
    })

    .catch(function (err) {
      console.log(err);
    });


});



router.post("/recibirClasico", function (req, res) {

  usuarioSolicitante = req.body.usuarioSolicitante

  SiniestroAsistencia
    .find({ usuarioSolicitante: usuarioSolicitante })
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post("/recibirEspecializado", function (req, res) {

  usuarioEspecializado = req.body.usuarioEspecializado

  SiniestroAsistencia
    .find({ usuarioEspecializado: usuarioEspecializado })
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });

});

router.post("/recibirIndividual", function (req, res) {

  id = req.body.id

  SiniestroAsistencia
    .find({ _id: id })
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });

});


router.put('/editar/:id', function (req, res) {

  SiniestroAsistencia.updateOne({ _id: req.params.id }, 
      { $set: {
        usuarioEspecializado : req.body.usuarioEspecializado,
        estado : req.body.estado
     
      }  },
      function (error, info) {
          if (error) {
              res.json({
                  resultado: false,
                  msg: 'No se pudo modificar el siniestro',
                  err:'error al modificar el siniestro'
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

module.exports = router;

/* {
  categoriaIncidente : req.body.categoriaIncidente,
  rutaIncidente : req.body.rutaIncidente,
  descripcionIncidente : req.body.descripcionIncidente,
  iconoIncidente : req.body.iconoIncidente,
  longitud : req.body.longitud,
  latitud : req.body.latitud,
  metodoPago : req.body.metodoPago,
  tipoAsistencia : req.body.tipoAsistencia,
  usuarioSolicitante : req.body.usuarioSolicitante,
  usuarioEspecializado : req.body.usuarioEspecializado,
  estado : req.body.estado,
  
  image: req.body.estado
}  */