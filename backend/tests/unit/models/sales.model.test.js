const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/connection');
const { salesFromDB, foundSales } = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');

describe('Testes da SALES MODEL', function () {
    it('Lista todos as vendas do DB', async function () {
        sinon.stub(connection, 'execute').resolves([salesFromDB]);

        const sales = await salesModel.findAllSales();

        expect(sales).to.be.an('array');
        expect(sales).to.be.deep.equal(salesFromDB);
    });

    it('Caso exista, lista mais de uma venda do mesmo ID', async function () {
        sinon.stub(connection, 'execute').resolves([foundSales[0], foundSales[1]]);

        const saleId = 1;
        const sales = await salesModel.findSale(saleId);

        expect(sales).to.be.an('object');
        expect(sales).to.be.deep.equal(foundSales[0], foundSales[1]);
    });

    it('Lista apenas uma venda de acordo com o ID passado', async function () {
        sinon.stub(connection, 'execute').resolves([foundSales[2]]);

        const saleId2 = 2;
        const sale = await salesModel.findSale(saleId2);

        expect(sale).to.be.an('object');
        expect(sale).to.be.deep.equal(foundSales[2]);
    });

    afterEach(function () {
        sinon.restore();
      });
});
