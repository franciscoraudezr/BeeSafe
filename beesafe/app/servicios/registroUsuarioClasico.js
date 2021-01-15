const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Usuario = require("../schema/modeloUsuarios");
router.post("/insertar", async function (req, res) {
  var usuarioNuevo = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    tipoUsuario: 1,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    password: req.body.password,
    edad: req.body.edad,
    correo: req.body.correo,
    tipoCedula: req.body.tipoCedula,
    cedula: req.body.cedula,
  });

  usuarioNuevo
    .save()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });

  const transporter = nodemailer.createTransport({
    host: "mail.alineacr.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "beesafe@alineacr.com", // generated ethereal user
      pass: "admin", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


 
contentHTML = `<html>
  <head>
  <link href="https://fonts.googleapis.com/css?family=Baloo|Baloo+2&display=swap" rel="stylesheet">
      
      <style>
          .cuerpo {
              background: #f3f3f3;
              font-family: "Baloo 2", cursive;
          }
  
          .container {
              margin: 0 auto;
              background: #fff;
              width: 500px;
              text-align: center;
              padding: 10px;
          }
  
          .boton {
              background: #cc5d01;
              color: #2f2319;
              display: block;
              padding: 15px;
              text-decoration: none;
              width: 50%;
              margin: 0 auto;
              font-weight: bolder;
          }
      </style>
  </head>
  
  <body class="cuerpo">
      <div class="container">
     
          <h1>Bienvenido a BeeSafe</h1>
          <h2>Su reporte de siniestros</h2>
  
          <p>Saludos ${usuarioNuevo.nombre} ${usuarioNuevo.apellido} ahora puedes ingresar a la aplicación de siniestros viales.</p>
          <p>El correo electrónico asociado es: ${usuarioNuevo.correo}</p>
          <p>Su contraseña temporal es: ${usuarioNuevo.password}</p>
          <p>Para ingresar de clikc al botón<p>
                  <a target="blanck" href="http://localhost:5252/index.html" class="boton">Ingresar a la app </a>
      </div>
  
  </body>
  
  </html> `;

  const infoCorreo = await transporter.sendMail({
    from: '"BeeSafe 🐝" <beesafe@alineacr.com>', // sender address
    to: req.body.correo, // list of receivers
    subject: "Bienvenido a BeeSafe ✔", // Subject line
    html: contentHTML, // html body

    // html body
  });




  
});

module.exports = router;
