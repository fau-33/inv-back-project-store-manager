const productsModel = require('../models/products.model');

const quantityValidation = (req, res, next) => {
    const sale = req.body;

    const quantityIsDefined = sale.every((s) => s.quantity !== undefined);
    if (!quantityIsDefined) return res.status(400).json({ message: '"quantity" is required' });
    
    const notPassQuantity = sale.some((s) => s.quantity <= 0);
    if (notPassQuantity) {
        return res.status(422).json(
            { message: '"quantity" must be greater than or equal to 1' },
        );
    }

    return next();
};

const productValidation = async (req, res, next) => {
    const sale = req.body;

    const productIsNotDefined = sale.some(({ productId }) => productId === undefined);
    if (productIsNotDefined) return res.status(400).json({ message: '"productId" is required' });

    const idsReq = sale.map((s) => s.productId);
    const products = await productsModel.findAllProducts();
    const idsModel = products.map((p) => p.id);

    const allIncludes = idsReq.every((id) => idsModel.includes(id));

    if (!allIncludes) {
        return res.status(404).json({ message: 'Product not found' });
    }

    return next();
};

module.exports = {
    quantityValidation,
    productValidation,
};