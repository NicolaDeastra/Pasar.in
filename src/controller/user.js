import db from '../models'

class productController {
  static getRegister = (req, res) => {
    res.render('register')
  }

  static postRegister = async (req, res, next) => {
    const { body } = req

    try {
      const user = db.User.register(body)

      res.redirect('/login')
    } catch (err) {
      next(err)
    }
  }
}

export default productController
