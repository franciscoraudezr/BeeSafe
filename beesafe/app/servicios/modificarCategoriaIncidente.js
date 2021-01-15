var express = require("express");
var router = express.Router();

var CategoriaIncidente = require('../schema/modeloCategoriaIncidente.js');

router.post("/recibir", function (req, res) {
    id = req.body._id

    CategoriaIncidente
        .find({ _id: id })
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (error) {
            console.log(error);
        });
});


/* image: '/assets/uploads/' + req.file.originalname */
router.put('/editar/:id', function (req, res) {

    CategoriaIncidente.updateOne({ _id: req.params.id }, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            image: '/assets/uploads/' + req.file.originalname
        }
    },
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