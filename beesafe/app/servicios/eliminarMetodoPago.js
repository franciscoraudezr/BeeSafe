var express = require("express");
var router = express.Router();


var eliminarMetodoPago = require('../schema/modeloMetodoPago');

router.delete('/borrar/:id', async (req, res) => {
    const EliminarMetodoPago = await eliminarMetodoPago.findByIdAndDelete(req.params.id); 
    res.json({message: 'Metodo de pago Eliminado'});
});


module.exports = router;
