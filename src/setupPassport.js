var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    Model = require('./models/usuariosModel.js')

    module.exports = function(app) {
      app.use(passport.initialize())
      app.use(passport.session())

      passport.use(new LocalStrategy(
        function(username, password, done) {
          Model.findOne({
            where: {
              'email': username
            }
          }).then(function (user) {
            if (user == null) {
              return done(null, false, { message: 'Usuario incorrecto' })
            }

            var hashedPassword = bcrypt.hashSync(password, user.salt)

            if (user.password === hashedPassword) {
              return done(null, user)
            }

            return done(null, false, { message: 'Contraseña incorrecta' })
          })
        }
      ))

      passport.serializeUser(function(user, done) {
        done(null, user.id)
      })

      passport.deserializeUser(function(id, done) {
        Model.findOne({
          where: {
            'id': id
          }
        }).then(function (user) {
          if (user == null) {
            done(new Error('User id incorrecto.'))
          }

          done(null, user)
        })
      })
    }
