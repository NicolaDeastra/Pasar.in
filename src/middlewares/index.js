import multer from 'multer'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import { User } from '../models'

const multerPhoto = multer({ dest: 'uploads/photo' })

export const uploadPhoto = multerPhoto.single('photo')

export const checkAuth = async (req, res, next) => {
  const secret = process.env.SECRET

  try {
    const token = req.cookies.authToken
    const decode = jwt.verify(token, secret)
    const user = await User.findOne({
      where: { id: decode.id, tokens: { [Op.contains]: [token] } },
    })

    if (!user) {
      throw new Error('user not found')
    }

    req.user = user
    res.locals.loggedUser = 1

    next()
  } catch (err) {
    res.locals.loggedUser = null
    next()
  }
}

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()

  res.redirect('/users/login')
}
