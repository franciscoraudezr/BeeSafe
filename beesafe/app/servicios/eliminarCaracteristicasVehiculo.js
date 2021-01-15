var express = require("express");
var router = express.Router();


var EliminarCaracteristicas = require('../schema/modeloCaracteristicaVehiculo');

router.delete('/borrar/:id', async (req, res) => {
    const eliminarCaracteristicas = await EliminarCaracteristicas.findByIdAndDelete(req.params.id); 
    res.json({message: 'Caracteristica Eliminada'});
  
});

module.exports = router;
