const salesService = require('../services/sales.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllSales = async (req, res) => {
    const { status, data } = await salesService.findAllSales();

    return res.status(mapStatusHTTP(status)).json(data);
};

const findSale = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.findSale(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
};

/* const insertSale = async (req, res) => {
    const sale = req.body;
    const { status, data } = await salesService.insertSale(sale);
  
    return res.status(mapStatusHTTP(status)).json(data);
  }; */

module.exports = {
    findAllSales,
    findSale,
};