const connection = require('../connection');
const { handleColumns, handlePlaceholders } = require('../utils/query.products');

const findAllProducts = async () => {
    const query = 'SELECT * FROM products ORDER BY id ASC';
    const [products] = await connection.execute(query);

    return products;
};

const findProduct = async (productId) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [[product]] = await connection.execute(query, [productId]);

    return product;
};

const insertProducts = async (product) => {
    const columns = handleColumns(product);
    const placeholders = handlePlaceholders(product);

    const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;
    const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

    return insertId;
};

const updateProduct = async (id, productName) => {
    const query = `UPDATE products SET name = '${productName}' WHERE id = ${id}`;
    await connection.execute(query);
};

/* const deleteProduct = async (id) => {
    const query = `DELETE FROM products WHERE id = ${id}`;
  
    await connection.execute(query);
  }; */

module.exports = {
    findAllProducts,
    findProduct,
    insertProducts,
    updateProduct,
    
};