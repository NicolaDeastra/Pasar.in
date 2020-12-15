import { User } from '../models'

class productController {
  static getRegister = (req, res) => {
    res.render('register', { messages: null })
  }

  static postRegister = async (req, res, next) => {
    const { body } = req

    try {
      const user = User.register(body)

      res.redirect('/users/login')
    } catch (err) {
      req.flash('error', 'Register error')
      res.render('register', { messages: req.flash('error') })
    }
  }

  static getLogin = (req, res) => {
    res.render('login', { messages: null })
  }

  static login = async (req, res) => {
    const { body } = req

    try {
      const user = await User.authenticate(body)
      const token = await user.generateToken()

      res
        .status(200)
        .cookie('authToken', token, {
          httpOnly: true,
          maxAge: 3600000,
        })
        .redirect('/')
    } catch (err) {
      req.flash('error', 'login error')
      res.status(400).render('login', { messages: req.flash('error') })
    }
  }

  static userMe = (req, res) => {
    const { dataValues } = req.user

    res.render('profile', dataValues)
  }
}

export default productController
