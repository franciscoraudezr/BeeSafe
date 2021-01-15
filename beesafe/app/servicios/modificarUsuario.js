var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var modificarUsuarios = require("../schema/modeloUsuarios");


router.put('/editar/:id', function (req, res) {

    modificarUsuarios.updateOne({ _id: req.params.id }, 
      { $set: req.body },
      function (error, info) {
          if (error) {
              res.json({
                  resultado: false,
                  msg: 'No se pudo el modificar le usuario',
                  err:'no se creo el usuario'
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



router.put('/editarFoto/:id', function (req, res) {

    modificarUsuarios.updateOne({ _id: req.params.id }, {
        $set: {
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            password : req.body.password,
            edad : req.body.edad,
            correo : req.body.correo,
            tipoCedula : req.body.tipoCedula,
            cedula : req.body.cedula,
            tipoAsistencia : req.body.tipoAsistencia,
          
            image: '/assets/uploads/' + req.file.filename
        }
    },
        function (error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el cliente',
                    err:'no se pudo modificar'
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
