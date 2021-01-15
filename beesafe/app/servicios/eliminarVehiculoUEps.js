var express = require("express");
var router = express.Router();


var Vehiculo = require('../schema/modeloVehiculo');

router.delete('/borrar/:id', async (req, res) => {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id); 
    res.json({message: 'Vehiculo Eliminado'});
  
});

module.exports = router;
