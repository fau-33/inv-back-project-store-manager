const { expect } = require('chai');
const sinon = require('sinon');

const { salesFromDB, foundSales } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

describe('Testes da SALES SERVICE', function () {
    it('Lista todas as vendas com sucesso', async function () {
        sinon.stub(salesModel, 'findAllSales').resolves(salesFromDB);

        const result = await salesService.findAllSales();
        const { status, data } = result;

        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal(salesFromDB);
    });

    it('Lista uma única venda com sucesso', async function () {
        sinon.stub(salesModel, 'findSale').resolves(foundSales[2]);

        const saleId = 2;
        const result = await salesService.findSale(saleId);
        const { status, data } = result;

        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(foundSales[2]);
    });

    it('Retorna uma mensagem de erro ao tentar listar uma venda passando um ID inválido', async function () {
        sinon.stub(salesModel, 'findSale').resolves([]);

        const saleId = 234525423;
        const result = await salesService.findSale(saleId);
        const { status, data } = result;

        expect(status).to.be.equal('NOT_FOUND');
        expect(data).to.be.an('object');
        expect(data.message).to.be.an('string');
        expect(data.message).to.be.equal('Sale not found');
    });

    afterEach(function () {
        sinon.restore();
      });
});
