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
    req.flash('error', "Please, fill in all the fields.")
    res.render('signup')
  }

  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.")
    res.render('signup')
  }

  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)

  const query = 'INSERT INTO usuarios (email, password, firstname, lastname, roll, salt) VALUES ('+"'"+email+"', '"+hashedPassword+"', '"+txtNombre +"','"+txtApellido +"', "+ roll +", '"+salt+"')";
  sequelize.query(query).spread((results, metadata) => {
    console.log('Exitoso');
  res.redirect('/home')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different email.")
    console.log(error);
    res.redirect('/signup')
  })
}
