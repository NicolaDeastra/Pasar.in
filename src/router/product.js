import express from 'express'

import productController from '../controller/product'

import { uploadPhoto } from '../middlewares'

const router = express.Router()

router.get('/', productController.getProducts)
router.post('/', uploadPhoto, productController.postProduct)
router.post('/buy/:id', productController.buyProduct)

export default router
