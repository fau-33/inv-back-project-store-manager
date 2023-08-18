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

const insertProducts = async (product) => {
    const registerId = await productsModel.insertProducts(product);
    const newProduct = await productsModel.findProduct(registerId);

    return {
        status: 'CREATED',
        data: newProduct,
      };
};

const updateProducts = async (id, productObj) => {
    const product = await productsModel.findProduct(id);

    if (!product) {
        return {
            status: 'NOT_FOUND',
            data: { message: 'Product not found' },
          };
    }

    const { name } = productObj;
    await productsModel.updateProduct(id, name);

    return {
        status: 'SUCCESSFUL',
        data: { id, name },
      };
};

const deleteProduct = async (id) => {
    const product = await productsModel.findProduct(id);
  
    if (!product) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Product not found' },
      };
    }
  
    await productsModel.deleteProduct(id);
  
    return {
      status: 'DELETED',
    };
  };

module.exports = {
    findAllProducts,
    findProduct,
    insertProducts,
    updateProducts,
    deleteProduct,
};