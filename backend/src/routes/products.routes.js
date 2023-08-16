const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const router = Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.findProduct);

router.post('/', productsController.insertProducts);

module.exports = router;