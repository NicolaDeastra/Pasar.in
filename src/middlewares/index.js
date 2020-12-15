import multer from 'multer'

const multerPhoto = multer({ dest: 'uploads/photo' })

export const uploadPhoto = multerPhoto.single('photo')

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()

  res.redirect('/users/login')
}
