const { expect } = require('chai');
const sinon = require('sinon');

const { productsFromDB } = require('../mocks/products.mock');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

describe('Testes do PRODUCTS SERVICE', function () {
    it('Lista todos os produtos com sucesso', async function () {
        sinon.stub(productsModel, 'findAllProducts').resolves(productsFromDB);
        const result = await productsService.findAllProducts();
        const { status, data } = result;

        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal(productsFromDB);
    });

    it('Lista um único produto com sucesso', async function () {
        sinon.stub(productsModel, 'findProduct').resolves(productsFromDB[0]);

        const productId = 1;
        const result = await productsService.findProduct(productId);
        const { status, data } = result;

        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(productsFromDB[0]);
    });

    it('Retorna uma mensagem de erro ao tentar listar um produto usando um ID inválido', async function () {
        sinon.stub(productsModel, 'findProduct').resolves(null);
        const productId = 234525423;
        const result = await productsService.findProduct(productId);
        const { status, data } = result;

        expect(status).to.be.equal('NOT_FOUND');
        expect(data).to.be.an('object');
        expect(data.message).to.be.an('string');
        expect(data.message).to.be.equal('Product not found');
    });

    it('Verifica se a estrutura do novo objeto cadastrado está correta', async function () {
        sinon.stub(productsModel, 'insertProducts').resolves(productsFromDB.length + 1);

        const newProduct = {
            name: 'ProdutoX',
          };

          const id = await productsModel.insertProducts(newProduct);

          sinon.stub(productsModel, 'findProduct').resolves({ id, ...newProduct });

          const result = await productsService.insertProducts(newProduct);

          expect(result).to.be.an('object');
          expect(result.status).to.be.equal('CREATED');
          expect(result.data).to.be.deep.equal({ id, name: newProduct.name });
    });

    afterEach(function () {
        sinon.restore();
      });
});
