const Product = require('../product');



module.exports.getProducts = async (req, res, next) => {
     try {
          const result = await Product.find({})
          res.status(200).json({ status: "success", data: result })
     } catch (error) {
          res.status(400).json({ result: "failed", error: error.message })
     }
}


module.exports.createProduct = async (req, res, next) => {
     try {
          const result = await Product.create(req.body)
          result.logger()
          res.status(200).send({ result: 'successful', data: result })
     } catch (error) {
          res.status(400).json({ result: 'failed', error: error.message })
     }
}


module.exports.updateProduct = async (req, res, next) => {
     try {
          const id = req.params.id;
          const result = await Product.updateOne({ id: id }, { $set: req.body })
          res.status(200).json({ status: "success", result: result })
     } catch (error) {
          res.status(400).json({ result: 'failed', error: error.message })
     }
}