import multer from 'multer'
import jwt from 'jsonwebtoken'
import sequelize, { Op } from 'sequelize'
import { User } from '../models'

const multerPhoto = multer({
  dest: 'uploads/photo',
  limits: {
    fileSize: 1500000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload image file'))
    }

    return cb(undefined, true)
  },
})

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
  if (req.user) {
    next()
  } else {
    res.redirect('/users/login')
  }
}

export const isPublic = (req, res, next) => {
  if (req.user) {
    res.redirect('/')
  } else {
    next()
  }
}

export const clientErrorHandler = (req, res, next) => {
  res.status(404).render('404')
}

export const dbErrorHandler = async () => {
  try {
    await sequelize.authenticate()
  } catch (err) {
    throw new Error('Unable to connect to the database , ', err.message)
  }
}

export const fileErrorHandler = (error, req, res, next) => {
  req.flash('error', error.message)
  res.status(400).render('create', { messages: req.flash('error') })
}
