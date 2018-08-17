const app = require('./app');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('Test calculate sales modules',()=>{
  describe('Test processCal()',()=>{
    it('should throw error with invalid amount of items input to processCal()', ()=>{
      assert.throws(function() { app.processCal(-3600, 2.25, "MI") }, Error, "Invalid amount");
    });
  
    it('should throw error with invalid price input to processCal()', ()=>{  
      assert.throws(function() { app.processCal(3600, -2.25, "MI") }, Error, "Invalid price");
    });
  
    it('should throw error with invalid state code input to processCal()', ()=>{    
      assert.throws(function() { app.processCal(3600, 2.25, "MII") }, Error, "Invalid state code");
    });
  
    it('should return no matched state found if input state code to processCal() does not exist', ()=>{      
      var res = app.processCal(3600, 2.25, "CD");
      expect(res).to.be.a('string');
      if(res !== "No matched state found"){
        throw new Error(`Expect 'No matched state found', but got ${res}`);
      }
    });
  
    it('should return valid total cost', ()=>{      
      var res = app.processCal(3600, 2.25, "MI");
      expect(res).to.be.a('string');
      expect(res).to.have.lengthOf(8);
      if(res !== "$7984.98"){
        throw new Error(`Expect '$7984.98', but got ${res}`);
      }
    });  
  });
  
  describe('Test toNum()',()=>{
    it('should return a number for toNum()', ()=>{
      var res = app.toNum('14.975%');
      expect(res).to.be.a('number');
      expect(res).to.be.equal(0.14975);
    });  
  });
  
  describe('Test genDiscount()',()=>{
    it('should return 0 with input less than 1000 for genDiscount()', ()=>{
      var res = app.genDiscount(500);
      expect(res).to.be.a('number');
      expect(res).to.be.equal(0);
    });  
  });
});