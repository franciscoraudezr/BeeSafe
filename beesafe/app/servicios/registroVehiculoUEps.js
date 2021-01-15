var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var registroVehiculo = require('../schema/modeloVehiculo');

router.post('/insertar', function (req, res) {
    var VehiculoNuevo = new registroVehiculo({
        _id: new mongoose.Types.ObjectId(),
        caracteristicasVehiculo:req.body.caracteristicasVehiculo,
        placaVehi: req.body.placaVehi,
        
        anno: req.body.anno,
        tipo_vehiculo: req.body.tipo_vehiculo,
        identificador: req.body.identificador
    });
    VehiculoNuevo.save()
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    });
     module.exports = router;