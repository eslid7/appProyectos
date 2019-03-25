var bcrypt = require('bcrypt'),
    Model = require('../models/usuariosModel.js');
const sequelize = require('../../database/dbConfig');

module.exports.show = function(req, res) {
  res.render('signup')
}

module.exports.signup = function(req, res) {
  var email = req.body.userEmail,
   password = req.body.password,
   password2 = req.body.password2,
   txtNombre = req.body.txtNombre,
   txtApellido = req.body.txtApellido,
   roll = 3;
/* roll= 1 = admin,  roll = 2 = Editor,  roll = 3 = Visor*/

/* Se verifica que el Email no esté siendo utilizado por otro usuario*/
/*Model.findAll({
  attributes: { include: [[sequelize.fn('COUNT', sequelize.col('email')), 'no_email']] },
  where: {email: email}
}).then(existeUsuario => {
    if (existeUsuario.no_email > 0) {
      req.flash('error', "El email ingresado ya se encuentra en uso.")
      res.render('signup')
    }
  });*/


  if (!email || !password || !password2 || !txtNombre || !txtApellido) {
    res.render('signup',{
     errorMessage : req.flash('errorMessage', "Favor llenar todos los datos")
   });
   return false;
  }

  if (password !== password2) {
    var error = ["Favor ingresar la misma Contraseña en ambas casillas"];
    //res.send(error);
    res.render('signup',{
     errorMessage : error
   });
   console.log('fallo');
   return false;
  }

  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)

  const query = 'INSERT INTO usuarios (email, password, firstname, lastname, roll, salt) VALUES ('+"'"+email+"', '"+hashedPassword+"', '"+txtNombre +"','"+txtApellido +"', "+ roll +", '"+salt+"')";
  sequelize.query(query).spread((results, metadata) => {
    console.log('Exitoso');
    var mensaje = ["Gracias por Registrarse, ahora puede proceder a ingresar al sistema"]
    console.log(mensaje);
    //res.send(error);
    res.render('home',{
     errorMessage : mensaje
  });
}).catch(function(error) {
    var error = ["El email ingresado ya se encuentra en uso, favor utilizar uno diferente"]
    console.log(error);
    //res.send(error);
    res.render('signup',{
     errorMessage : error
   });
   return false;
 })
}
