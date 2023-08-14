const connection = require('../connection');

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

module.exports = {
    findAllProducts,
    findProduct,
};