const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/connection');
const { productsFromDB } = require('../mocks/products.mock');
const productsModel = require('../../../src/models/products.model');

describe('Testes do PRODUCTS MODEL', function () {
    it('Lista todos os produtos do DB', async function () {
        sinon.stub(connection, 'execute').resolves([productsFromDB]);

        const products = await productsModel.findAllProducts();

        expect(products).to.be.an('array');
        expect(products).to.be.deep.equal(productsFromDB);
    });

    it('Lista um único produto de acordo com o ID passado', async function () {
        sinon.stub(connection, 'execute').resolves([productsFromDB]);

        const productId = 1;
        const products = await productsModel.findProduct(productId);

        expect(products).to.be.an('object');
        expect(products).to.be.deep.equal(productsFromDB[0]);
    });

    it('Verifica se é gerado um novo ID ao cadastrar um produto no Banco de Dados', async function () {
        const productsLength = productsFromDB.length;
        sinon.stub(connection, 'execute').resolves([{ insertId: productsLength + 1 }]);

        const newProduct = {
            name: 'ProdutoX',
          };
          const newProductId = productsLength + 1;
          const result = await productsModel.insertProducts(newProduct);

          expect(result).to.be.an('number');
          expect(result).to.be.deep.equal(newProductId);
    });

    afterEach(function () {
        sinon.restore();
      });
});