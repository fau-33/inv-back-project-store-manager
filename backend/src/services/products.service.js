const productsModel = require('../models/products.model');

const findAllProducts = async () => {
    const products = await productsModel.findAllProducts();

    return {
        status: 'SUCCESSFUL',
        data: products,
      };
};

const findProduct = async (productId) => {
    const product = await productsModel.findProduct(productId);
    
    if (!product) {
        return {
            status: 'NOT_FOUND',
            data: { message: 'Product not found' },
          };
    }

    return {
        status: 'SUCCESSFUL',
        data: product,
      };
};

module.exports = {
    findAllProducts,
    findProduct,
};