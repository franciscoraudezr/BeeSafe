var express = require("express");
var router = express.Router();

var ListarCategoriaIncidente = require('../schema/modeloCategoriaIncidente');


router.get("/recibir", function(req, res) { 

    ListarCategoriaIncidente.find().exec()
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  
  });


  
router.post("/modificar", function(req, res) { 

  ListarCategoriaIncidente.find().exec()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err);
    });

});

  
  module.exports = router;