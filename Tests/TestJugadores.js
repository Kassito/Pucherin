var expect = chai.expect;
chai.should();
//poco eficiente, investigar más
describe("Comprobar fichas", function(){
    describe("Reparte las fichas entre 2 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 2", function(){
            repartir(2).should.equal(30);
            expect(document.getElementById('jug1')).to.equal("Jugador1");
            expect(document.getElementById('jug2')).to.equal("Jugador2");
            expect(document.getElementById('ficInit')).to.equal("FichasInicio1");
            expect(document.getElementById('ficGanad')).to.equal("fichasGanadas1");
            // expect(jug1.find('jug1').text().to.equal('Jugador1'))
            // expect(ficInit.find('ficInit').text().to.equal('fichasInicio1'))
            // expect(ficGanad.find('ficGanad').text().to.equal('fichasGanadas1'))
            // expect(jug2.find('jug2').text().to.equal('Jugador2'))
            // expect(ficInit.find('ficInit').text().to.equal('fichasInicio2'))
            // expect(ficGanad.find('ficGanad').text().to.equal('fichasGanadas2'))
        });
    });
    describe("Reparte las fichas entre 3 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 3", function(){
            // expect(jug1.find('div.jug1').text().to.equal('Jugador 1'))
            // expect(jug2.find('div.jug2').text().to.equal('Jugador 2'))
            // expect(jug3.find('div.jug3').text().to.equal('Jugador 3'))
            repartir(3).should.equal(20);
        });
    });
    describe("Reparte las fichas entre 4 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 4", function(){
            // expect(jug1.find('div.jug1').text().to.equal('Jugador 1'))
            // expect(jug2.find('div.jug2').text().to.equal('Jugador 2'))
            // expect(jug3.find('div.jug3').text().to.equal('Jugador 3'))
            // expect(jug4.find('div.jug4').text().to.equal('Jugador 4'))
            repartir(4).should.be.equal(15);
        });
    });
    describe("Reparte las fichas entre 5 jugadores", function(){
        it("Tiene que ser igual al número de jugadores entre 5", function(){
            // expect(jug1.find('div.jug1').text().to.equal('Jugador 1'))
            // expect(jug2.find('div.jug2').text().to.equal('Jugador 2'))
            // expect(jug3.find('div.jug3').text().to.equal('Jugador 3'))
            // expect(jug4.find('div.jug4').text().to.equal('Jugador 4'))
            // expect(jug5.find('div.jug5').text().to.equal('Jugador 5'))
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