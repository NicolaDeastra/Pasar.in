import { User } from '../models'
import passport from '../lib/passport'

class productController {
  static getRegister = async (req, res) => {
    res.render('register')
  }

  static postRegister = async (req, res, next) => {
    const { body } = req

    try {
      const user = User.register(body)

      res.redirect('/users/login')
    } catch (err) {
      next(err)
    }
  }

  static getLogin = (req, res) => {
    res.render('login')
  }

  static login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
}

export default productController
