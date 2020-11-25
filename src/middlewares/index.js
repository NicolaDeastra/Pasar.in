import multer from 'multer'

const multerPhoto = multer({ dest: 'uploads/photo' })

export const uploadPhoto = multerPhoto.single('photo')
