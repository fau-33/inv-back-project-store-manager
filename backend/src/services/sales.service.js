const salesModel = require('../models/sales.model');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();

  return {
    status: 'SUCCESSFUL',
    data: sales,
  };
};

const findSale = async (saleId) => {
  const sale = await salesModel.findSale(saleId);

  if (sale.length < 1) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    };
  }

  return {
    status: 'SUCCESSFUL',
    data: sale,
  };
};

module.exports = {
  findAllSales,
  findSale,
};