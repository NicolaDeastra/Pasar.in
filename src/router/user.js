import express from 'express'

import userController from '../controller/user'
import { isAuth } from '../middlewares'

const router = express.Router()

router.get('/register', userController.getRegister)
router.post('/register', userController.postRegister)
router.get('/login', userController.getLogin)
router.post('/login', userController.login)
router.get('/me', isAuth, userController.userMe)
router.get('/logout', userController.logout)

export default router
