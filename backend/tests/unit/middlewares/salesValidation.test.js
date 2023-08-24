const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { 
    quantityValidation, productValidation } = require('../../../src/middlewares/salesValidation');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa as validações ao adicionar novas vendas', function () {
    it('Verifica se retorna o erro com status 400 ao não passar uma "quantity" na requisição', async function () {
        const req = {
            body: [{ productId: 3 }],
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const next = sinon.stub().resolvesThis();
      
          await quantityValidation(req, res, next);

          expect(res.status).to.have.been.calledWith(400);
          expect(next).not.to.have.been.calledWith();
          expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
    });
    
    it('Verifica se retorna o erro com status 422 ao passar uma "quantity" com um valor menor ou igual a zero', async function () {
        const req = {
            body: [{ productId: 3, quantity: 0 }],
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const next = sinon.stub().resolvesThis();
      
          await quantityValidation(req, res, next);

          expect(res.status).to.have.been.calledWith(422);
          expect(next).not.to.have.been.calledWith();
          expect(res.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Verifica se retorna o erro com status 400 ao não passar um "productId" na requisição', async function () {
        const req = {
            body: [{ quantity: 5 }],
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const next = sinon.stub().resolvesThis();
      
          await productValidation(req, res, next);

          expect(res.status).to.have.been.calledWith(400);
          expect(next).not.to.have.calledWith();
          expect(res.json).to.be.calledWith({ message: '"productId" is required' });
    });

    it('Verifica se retorna o erro com status 404 passar um "productId" que não existe no Banco de Dados', async function () {
        const req = {
            body: [{ productId: 9999, quantity: 5 }],
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const next = sinon.stub().resolvesThis();
      
          await productValidation(req, res, next);

          expect(res.status).to.have.been.calledWith(404);
          expect(next).not.to.have.been.calledWith();
          expect(res.json).to.be.calledWith({ message: 'Product not found' });
    });

    it('Verifica se a validação é feita com sucesso ao passar os dados corretos', async function () {
        const req = {
            body: [{ productId: 1, quantity: 5 }],
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const next = sinon.stub().resolvesThis();
      
          await productValidation(req, res, next);

          expect(next).to.have.been.calledWith();
    });

    afterEach(function () {
        sinon.restore();
      });
});
