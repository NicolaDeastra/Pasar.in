import express from 'express'
import engine from 'ejs-locals'
import session from 'express-session'
import flash from 'express-flash'
import dotenv from 'dotenv'

import productRouter from './router/product'
import userRouter from './router/user'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

app.set('view engine', 'ejs')
app.engine('ejs', engine)
app.set('views', 'src/views')

app.use('/products', productRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hallo bitch')
})

app.listen(port, () =>
  console.log(`Server run on port : http://localhost:${port}`)
)