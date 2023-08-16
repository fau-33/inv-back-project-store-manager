const date = '2023-07-06T21:57:08.000Z';

const salesFromDB = [
  {
    saleId: 1,
    date: `${date}`,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: `${date}`,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: `${date}`,
    productId: 3,
    quantity: 15,
  },
];

const foundSales = [
  {
    date: `${date}`,
    productId: 1,
    quantity: 5,
  },
  {
    date: `${date}`,
    productId: 2,
    quantity: 10,
  },
  {
    date: `${date}`,
    productId: 3,
    quantity: 15,
  },
];

module.exports = {
  salesFromDB,
  foundSales,
};