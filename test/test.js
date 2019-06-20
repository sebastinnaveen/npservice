const express= require("express")
var chai = require('chai'),
 expect = chai.expect,
assert =chai.assert,
should = chai.should();
const sinon = require("sinon");
const controller = require("../controllers/controller");
const data = require("../mocks/mock");
var mockdata = data.dashboardObj;
describe('Name should be test', () => {
  it('should pass', (done) => {
    var test=mockdata[0];
    var req={};
    let res = {
      // replace empty function with a spy
      send: sinon.spy()
    }
    controller.getDashboard(req,res);
    const getDashboard = sinon.stub().returns(test.name);
    getDashboard().should.eql("test");
    getDashboard().should.not.eql("test1");
    done();
  });
});





/* describe("GET /Dashboard", function() {
    describe("GET /", function() {
      it("returns status code 200", function(done) {
        request.get(options, function(error, response, body) {
          //expect(response.statusCode).toBe(200);
          assert.equal(200, response.statusCode);
          body=JSON.parse(body)
          testCases(body);
          done();
        });
      });
    });
  });

  function testCases(body){
      console.log(typeof(body));
      var name =body.name;
      console.log(name);
      describe("GET /Testing Dashboard response body",function(){
          it("length of name should be greater than 4",function(done){
            expect(name.length).to.have.above(4);
            done();
          })  
      })
  }  */
 
 

