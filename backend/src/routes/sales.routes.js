const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const router = Router();

router.get('/', salesController.findAllSales);
router.get('/:id', salesController.findSale);
// router.post('/', salesController.insertSale);

module.exports = router;