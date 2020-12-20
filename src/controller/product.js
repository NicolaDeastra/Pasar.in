import { Op } from 'sequelize'
import { Product } from '../models'
import multer from 'multer'
import { uploadPhoto } from '../middlewares'

class productController {
  static getProducts = async (req, res) => {
    const {
      user: { id },
    } = req

    try {
      const products = await Product.findAll({
        where: {
          userId: id,
        },
      })

      // res.status(200).render('dashboard', { products })
      res.status(200).render('dashboard', { products })
    } catch (err) {
      res.status(400).send(err)
    }
  }

  static getProductsMinPrice = async (req, res) => {
    const { minPrice = '' } = req.query

    try {
      const products = await Product.findAll({
        where: {
          price: {
            [Op.gte]: minPrice,
          },
        },
      })

      res.status(200).render('dashboard', { products })
    } catch (err) {
      res.status(400).send(err)
    }
  }

  static getPostProduct = (req, res) => {
    res.render('create', { messages: null })
  }

  static postProduct = async (req, res) => {
    const {
      body: { name, stock, description, price, category },
      file: { path },
      user,
    } = req

    const bodyProduct = {
      name,
      fileUrl: path,
      stock,
      description,
      price,
      userId: user.id,
    }

    try {
      const product = await Product.create(bodyProduct)

      res.status(200).redirect('/products')
    } catch (err) {
      res.status(400).render('create', { messages: req.flash('error') })
    }
  }

  static getUpdateProduct = async (req, res) => {
    const { id } = req.params

    try {
      const product = await Product.findOne({ where: { id } })

      res.status(200).render('update', { product })
    } catch (err) {
      res.status(400).send(err)
    }
  }

  static postUpdateProduct = async (req, res) => {
    const {
      body,
      params: { id },
    } = req

    try {
      const product = await Product.update(body, { where: { id } })

      res.status(200).redirect('/products')
    } catch (err) {
      res.status(400).send(err)
    }
  }

  static deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
      const product = await Product.destroy({ where: { id } })

      res.status(200).redirect('/products')
    } catch (err) {}
  }

  static buyProduct = async (req, res) => {
    const {
      body: { stock },
      params: { id },
    } = req

    try {
      const product = await Product.findOne({
        where: { id },
      })

      product.stock -= stock

      product.save()

      res.status(200).send(product)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  static getCreateCategory = (req, res) => {
    res.render('createCategory')
  }

  static postCreateCategory = async (req, res) => {
    const { name } = req.body

    try {
      const category = await Category.create({ name })

      res.status(200).redirect('/products')
    } catch (err) {
      res.status(400).send(err)
    }
  }
}

export default productController
