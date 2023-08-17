const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const { nameValidation } = require('../middlewares/productsValidation');

const router = Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.findProduct);

router.post('/', nameValidation, productsController.insertProducts);

module.exports = router;