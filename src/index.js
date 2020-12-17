import express from 'express'
import engine from 'ejs-locals'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'

import globalRouter from './router/global'
import productRouter from './router/product'
import userRouter from './router/user'

import { checkAuth, clientErrorHandler, errorHandler } from './middlewares'

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(cookieParser())
app.use(flash())

app.use(express.json())
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

app.set('view engine', 'ejs')
app.engine('ejs', engine)
app.set('views', 'src/views')

app.use(checkAuth)

app.use(globalRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)

app.use(clientErrorHandler)

app.listen(port, () =>
  console.log(`Server run on port : http://localhost:${port}`)
)
