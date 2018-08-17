'use strict'

const taxRates = [
  { "province": "AB", "rate": "5%" },
  { "province": "ON", "rate": "13%" },
  { "province": "QC", "rate": "14.975%" },
  { "province": "MI", "rate": "6%" },
  { "province": "DE", "rate": "0%" }];

let genDiscount = function (cost){
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

let toNum = function (percent){
  return percent.replace("%","")/100;
}

let processCal = function (amount, price, state) {
  if( !amount || typeof amount !== 'number' || !Number.isInteger(amount) || amount < 0 ){
    throw new Error(`Invalid amount`);  
  } 
  if( !price || typeof price !== 'number' || price < 0 ){
    throw new Error(`Invalid price`);
  }
  if( !state || typeof state !== 'string' || state.length !== 2 ){
    throw new Error(`Invalid state code`);
  }  

  let cost = amount * price;
  let postDeduc = cost - genDiscount(cost);
  let taxAmount = taxRates.reduce((tax, el)=>{
    if(el.province === state){
      tax = postDeduc * toNum(el.rate);
    }
    return tax;
  }, null);
  
  if(!taxAmount){    
    return "No matched state found";
  }   

  let totalPrice = parseFloat(postDeduc + taxAmount).toFixed(2);
  // console.log(`Output: $${totalPrice}`);
  return `$${totalPrice}`;  
}

module.exports = { processCal, toNum, genDiscount }