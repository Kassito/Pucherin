var expect = chai.expect;
chai.should();

describe("Combrobar cookies", function(){
    it("Comprobar que hay 3 resultados", function(){
        cookilandRet().should.equal(document.cookie.replaceAll(/fichas/g, "fichas,").replace(/,$/, "").split(",").sort((p1, p2) => p2.split(" ")[2] - p1.split(" ")[2]).slice(0, 3));
    });
});
