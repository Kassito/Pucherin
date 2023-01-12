var expect = chai.expect;
chai.should();
//poco eficiente, investigar más
describe("Tirada dados", function(){
    describe("Sale un número de tirada con dos dados", function(){
        it("Tiene que ser igual o mayor que 2", function(){
            for(let i = 0; i < 1000; i++){
                tiradaDados().should.be.greaterThan(1);
            }
        });
        it("Tiene que ser igual o mayor que 12", function(){
            for(let i = 0; i < 1000; i++){
                tiradaDados().should.not.be.greaterThan(13);
            }
        });
    });
});