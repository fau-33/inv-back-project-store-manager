const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { 
    productValidation, 
    quantityValidation } = require('../middlewares/salesValidation');

const router = Router();

router.get('/', salesController.findAllSales);
router.get('/:id', salesController.findSale);
router.post('/', productValidation, quantityValidation, salesController.insertSale);

module.exports = router;