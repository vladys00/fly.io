const User = require('../models/User.model')

module.exports.signin = (req, res, next) => {
  res.render('auth/signin')
}

module.exports.doSignin = (req, res, next) => {
  // Funcion para renderizar el formulario con el error
  const renderWithErrors = () => {
    res.render('auth/signin', { error: 'Email o contraseña incorrectos', email: req.body.email })
  }

  
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return renderWithErrors()
      }

      return user.checkPassword(req.body.password)
        .then(match => {
          if (!match) {
            return renderWithErrors()
          }

          req.session.userId = user.id; // genero cookie y session
          res.redirect('/')
        })
    })
    .catch(err => {
      next(err)
    })
}

module.exports.logout = (req, res, next) => {
  console.log("entro en logout")
  req.session.destroy()
  res.clearCookie("express-cookie");
  res.redirect('/signin')
}