module.exports.isAuthenticated = (req, res, next) => {
    if (req.currentUser) {
      next()
    } else {
      res.redirect('/signin')
    }
  }
  
  module.exports.isNotAuthenticated = (req, res, next) => {
    if (!req.currentUser) {
      next()
    } else {
      res.redirect('/profile')
    }
  }