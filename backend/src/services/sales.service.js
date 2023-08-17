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

const insertSale = async (sale) => {
  const saleId = await salesModel.insertSaleDate();
  const updatedSale = sale.map((s) => ({ saleId, ...s }));
  await salesModel.insertSale(updatedSale);

  return {
    status: 'CREATED',
    data: { id: saleId, itemsSold: sale },
  };
};

module.exports = {
  findAllSales,
  findSale,
  insertSale,
};