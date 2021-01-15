var express = require("express");
var router = express.Router();
/* var path = require('path'); */

/* var fs_extra = require('fs-extra');
var unlink = fs_extra.unlink();
 */
/* const { unlink } = require('fs-extra');  */

var CategoriaIncidente = require('../schema/modeloCategoriaIncidente');

router.delete('/borrar/:id', async (req, res) => {
    const categoriaIncidente = await CategoriaIncidente.findByIdAndDelete(req.params.id);
    /* await unlink(path.resolve('../../public/assets/uploads' + categoriaIncidente.image)); */
    res.json({message: 'Categoria de Incidente Eliminado'});
});

/* 
'../public/assets/uploads' dir frank unlink '../../public/assets/uploads'

'public/uploads' dir fazt  unlink './backend/public/'
 */

module.exports = router;
