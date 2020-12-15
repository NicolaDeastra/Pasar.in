import express from 'express'

import globalController from '../controller/global'

const router = express.Router()

router.get('/', globalController.home)

export default router
