var expect = chai.expect;
chai.should();
//poco eficiente, investigar más
describe("Comprobar fichas", function(){
    describe("Reparte las fichas entre 2 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 2", function(){
            repartir(2).should.equal(30);
        });
    });
    describe("Reparte las fichas entre 3 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 3", function(){
            repartir(3).should.equal(20);
        });
    });
    describe("Reparte las fichas entre 4 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 4", function(){
            repartir(4).should.be.equal(15);
        });
    });
    describe("Reparte las fichas entre 5 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 5", function(){
            repartir(5).should.equal(12);
        });
    });
});

describe("Comprobar turno sorteo", function(){
    describe("Comprobar que el sorteo entra entre el número de jugadores", function(){
        it("Tiene que ser igual o menor que 2 y mayor o igual que 1", function(){
            sortear(2).should.be.greaterThan(0);
            sortear(2).should.not.be.greaterThan(3);
        });
        it("Tiene que ser igual o menor que 3 y mayor o igual que 1", function(){
            sortear(2).should.be.greaterThan(0);
            sortear(2).should.not.be.greaterThan(4);
        });
        it("Tiene que ser igual o menor que 4 y mayor o igual que 1", function(){
            sortear(2).should.be.greaterThan(0);
            sortear(2).should.not.be.greaterThan(5);
        });
        it("Tiene que ser igual o menor que 5 y mayor o igual que 1", function(){
            sortear(2).should.be.greaterThan(0);
            sortear(2).should.not.be.greaterThan(6);
        });
    });
});