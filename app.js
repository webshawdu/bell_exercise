'use strict';
const basedir = require('path').resolve(__dirname, '.');
const fs = require('fs');
const filename = 'taxRates.json';

function readJsonFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(basedir + '/' + filename, 'utf8', (err, data) => {
      if (err) { reject(err) }
      resolve(JSON.parse(data));
    });
  });
}

function genDiscount(cost){
  if( cost >= 0 && cost < 1000 ){
    return 0;
  }else if( cost >= 1000 && cost < 5000 ){
    return cost * 0.03;
  }else if( cost >= 5000 && cost < 7000 ){
    return cost * 0.05;
  }else if( cost >= 7000 && cost < 10000 ){
    return cost * 0.07;
  }else if( cost >= 10000 ){
    return cost * 0.1;
  }
}

function toNum(percent){
  return percent.replace("%","")/100;
}

let processCal = async function (amount, price, state) {
  if( !amount || typeof amount !== 'number' || !Number.isInteger(amount) || amount < 0 ){
    return "Invalid amount";  
  } 
  if( !price || typeof price !== 'number' || price < 0 ){
    return "Invalid price";
  }
  if( !state || typeof state !== 'string' || state.length !== 2 ){
    return "Invalid state code";
  }  

  let cost = amount * price;
  let postDeduc = cost - genDiscount(cost);  
  
  try{
    const taxRes = await readJsonFile(filename);
    for(let el of taxRes.taxRates){      
      if(el.province === state){
        let taxAmount = postDeduc * toNum(el.rate);        
        let totalPrice = parseFloat(postDeduc + taxAmount).toFixed(2);
        console.log(`Output: $${totalPrice}`);
        return `$${totalPrice}`;
      }
    }
    return "No matched state found";
  }catch(err){
    return console.log(err);
  }
}

module.exports = { processCal }