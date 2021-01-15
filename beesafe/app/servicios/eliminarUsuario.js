var express = require("express");
var router = express.Router();


var eliminarUsuario = require('../schema/modeloUsuarios');

router.delete('/borrar/:id', async (req, res) => {
    const EliminarUsuario = await eliminarUsuario.findByIdAndDelete(req.params.id); 
    res.json({message: 'Usuario Eliminado'});
});


module.exports = router;
