const camelize = require('camelize');
const connection = require('../connection');
// const { handleColumns, handlePlaceholders } = require('../utils/query.products');

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

/* const insertSaleDate = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';

  const [{ insertId }] = await connection.execute(query);

  return insertId;
}; */

/* const insertSale = async (sale) => {
  sale.forEach((s) => {
    const columns = handleColumns(s);
    const placeholders = handlePlaceholders(s);

    const query = `
    INSERT INTO sales_products (${columns}) VALUES (${placeholders})`;
    
    connection.execute(query, [...Object.values(s)]);
  });
}; */

module.exports = {
    findAllSales,
    findSale,
    
};