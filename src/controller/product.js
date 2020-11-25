import db from '../models'

class productController {
  static getProducts = async (req, res) => {
    try {
      const products = await db.Product.findAll({})

      // res.status(200).render('dashboard', { products })
      res.status(200).render('dashboard', { products })
    } catch (err) {
      res.status(400).send(err)
    }
  }

  static postProduct = async (req, res) => {
    const {
      body: { name, stock, description, price },
      file: { path },
    } = req

    const bodyProduct = {
      name,
      fileUrl: path,
      stock,
      description,
      price,
    }

    try {
      const product = await db.Product.create(bodyProduct)

      res.status(200).send(product)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  static buyProduct = async (req, res) => {
    const {
      body: { stock },
      params: { id },
    } = req

    try {
      const product = await db.Product.findOne({
        where: { id },
      })

      product.stock -= stock

      product.save()

      res.status(200).send(product)
    } catch (err) {
      res.status(400).send(err)
    }
  }
}

export default productController
