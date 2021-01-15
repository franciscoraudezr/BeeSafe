var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Vehiculo = require("../schema/modeloVehiculo");


router.put('/editar/:id', function (req, res) {

    Vehiculo.updateOne({ _id: req.params.id },
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

module.exports = router;
