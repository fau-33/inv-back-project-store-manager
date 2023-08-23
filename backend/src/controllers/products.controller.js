const productsService = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllProducts = async (req, res) => {
    const { status, data } = await productsService.findAllProducts();
    
    return res.status(mapStatusHTTP(status)).json(data);
};

const findProduct = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.findProduct(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
};

const insertProducts = async (req, res) => {
    const { body } = req;
    const { status, data } = await productsService.insertProducts(body);

    return res.status(mapStatusHTTP(status)).json(data);
};

/* const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { status, data } = await productsService.updateProducts(Number(id), body);

    return res.status(mapStatusHTTP(status)).json(data);
}; */

/* const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.deleteProduct(Number(id));
  
    if (!data) {
      return res.status(mapStatusHTTP(status)).send();
    }
  
    return res.status(mapStatusHTTP(status)).json(data);
  }; */

module.exports = {
    findAllProducts,
    findProduct,
    insertProducts,
    
};