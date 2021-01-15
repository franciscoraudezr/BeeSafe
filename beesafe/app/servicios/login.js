const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");


const Usuario = require('../schema/modeloUsuarios');

router.post('/inicio', function(req, res) {

  var correo = req.body.correo;
  Usuario.find({correo: correo}).exec()
  .then(
    function(result){
      res.json(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
})

module.exports = router;