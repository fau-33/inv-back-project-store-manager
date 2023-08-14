const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsFromDB } = require('../mocks/products.mock');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes do PRODUCTS CONTROLLER', function () {
  it('Lista todos os produtos com sucesso - Status 200', async function () {
    sinon.stub(productsService, 'findAllProducts').resolves({ status: 'SUCCESSFUL', data: productsFromDB });

    const req = {};
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.findAllProducts(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(productsFromDB);
  });
  
  it('Lista um único produto com sucesso - Status 200', async function () {
    sinon.stub(productsService, 'findProduct').resolves({ status: 'SUCCESSFUL', data: productsFromDB[0] });

    const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.findProduct(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(productsFromDB[0]);
  });

  it('Verifica se retorna o status correto do erro "Product not found" - Status 404', async function () {
    sinon.stub(productsService, 'findProduct').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    const req = {
        params: { id: 14543643 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.findProduct(req, res);
      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  beforeEach(function () {
    sinon.restore();
  });
});
