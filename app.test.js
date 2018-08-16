const app = require('./app');
const expect = require('chai').expect;

describe('Calculate cost',()=>{
  it('should not process with invalid amount of items input', async ()=>{      
    var res = await app.processCal(-3600, 2.25, "MI");
    expect(res).to.be.a('string');
    if(res !== "Invalid amount"){
      throw new Error(`Expect 'Invalid amount', but got ${res}`);
    }
  });

  it('should not process with invalid price input', async ()=>{      
    var res = await app.processCal(3600, -2.25, "MI");
    expect(res).to.be.a('string');
    if(res !== "Invalid price"){
      throw new Error(`Expect 'Invalid price', but got ${res}`);
    }
  });

  it('should not process with invalid state code input', async ()=>{      
    var res = await app.processCal(3600, 2.25, "MII");
    expect(res).to.be.a('string');
    if(res !== "Invalid state code"){
      throw new Error(`Expect 'Invalid state code', but got ${res}`);
    }
  });

  it('should return no result if input state code does not exist', async ()=>{      
    var res = await app.processCal(3600, 2.25, "CD");
    expect(res).to.be.a('string');
    if(res !== "No matched state found"){
      throw new Error(`Expect 'No matched state found', but got ${res}`);
    }
  });

  it('should return valid total cost', async ()=>{      
    var res = await app.processCal(3600, 2.25, "MI");
    expect(res).to.be.a('string');
    expect(res).to.have.lengthOf(8);
    if(res !== "$7984.98"){
      throw new Error(`Expect '$7984.98', but got ${res}`);
    }
  });
});