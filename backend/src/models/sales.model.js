const camelize = require('camelize');
const connection = require('../connection');

const findAllSales = async () => {
    const query = `
  SELECT sale_id, date, product_id, quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp
  WHERE s.id = sp.sale_id
  ORDER BY sale_id ASC, product_id ASC`;

  const [sales] = await connection.execute(query);

  return camelize(sales);
};

const findSale = async (saleId) => {
    const query = `
  SELECT date, product_id, quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp
  WHERE s.id = sp.sale_id AND s.id = ?
  ORDER BY sale_id ASC, product_id ASC`;

  const [sale] = await connection.execute(query, [saleId]);

  return camelize(sale);
};

module.exports = {
    findAllSales,
    findSale,
};