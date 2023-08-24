const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { nameValidation } = require('../../../src/middlewares/productsValidation');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa as validações do "name" da rota /products', function () {
    it('Verifica se retorna o erro com status 400 ao não passar um "name" no corpo da requisição', async function () {
        const req = {
            body: {},
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };

          const next = sinon.stub().resolvesThis();

          nameValidation(req, res, next);

          expect(res.status).to.have.been.calledWith(400);
          expect(next).not.to.have.been.calledWith();
          expect(res.json).to.be.calledWith({ message: '"name" is required' });
    }); 
    
    it('Verifica se retorna o erro com status 422 ao passar um "name" com tamanho menor que 5 caracteres', async function () {
        const req = {
            body: { name: 'abc' },
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const next = sinon.stub().resolvesThis();

          nameValidation(req, res, next);

          expect(res.status).to.have.calledWith(422);
          expect(next).not.to.have.been.calledWith();
          expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('Verifica se a validação é concluída com sucesso ao passar um "name" válido', async function () {
        const req = {
            body: { name: 'Jefferson' },
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const next = sinon.stub().resolvesThis();
      
          nameValidation(req, res, next);

          expect(next).to.have.been.calledWith();
    });

    afterEach(function () {
        sinon.restore();
      });
});
