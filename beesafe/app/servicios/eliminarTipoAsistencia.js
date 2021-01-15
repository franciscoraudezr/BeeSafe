var express = require("express");
var router = express.Router();


var TipoVehiculo = require('../schema/modeloTipoAsistencia');

router.delete('/borrar/:id', async (req, res) => {
    const tipoVehiculo = await TipoVehiculo.findByIdAndDelete(req.params.id); 
    res.json({message: 'Tipo de Vehiculo Eliminado'});
  
});



module.exports = router;
