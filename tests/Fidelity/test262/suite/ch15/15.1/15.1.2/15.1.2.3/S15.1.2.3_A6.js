// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * parseFloat may interpret only a leading portion of the string as
 * a number value; it ignores any characters that cannot be interpreted as part
 * of the notation of an decimal literal, and no indication is given that any such
 * characters were ignored.
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A6.js
 * @description Complex test without eval
 */

//CHECK
var errorCount = 0;
var count = 0;
var indexP;
var indexO = 0;
for (var index = 0; index <= 65535; index++) {  
  if ((index < 0x0030) || (index > 0x0039)) {    
    var hex = decimalToHexString(index);
    if (parseFloat("0.1e1" + String.fromCharCode(index)) !== 1) {       
      if (indexO === 0) { 
        indexO = index;
      } else {
        if ((index - indexP) !== 1) {             
          if ((indexP - indexO) !== 0) {
            var hexP = decimalToHexString(indexP);
            var hexO = decimalToHexString(indexO);
            $ERROR('#' + hexO + '-' + hexP + ' ');
          } 
          else {
            var hexP = decimalToHexString(indexP);
            $ERROR('#' + hexP + ' ');
          }  
          indexO = index;
        }         
      }
      indexP = index;
      errorCount++;    
    }   
    count++;
  }  
}

if (errorCount > 0) {
  if ((indexP - indexO) !== 0) {
    var hexP = decimalToHexString(indexP);
    var hexO = decimalToHexString(indexO);
    $ERROR('#' + hexO + '-' + hexP + ' ');
  } else {
    var hexP = decimalToHexString(indexP);
    $ERROR('#' + hexP + ' ');
  }     
  $ERROR('Total error: ' + errorCount + ' bad Unicode character in ' + count + ' ');
}

function decimalToHexString(n) {
  n = Number(n);
  var h = "";
  for (var i = 3; i >= 0; i--) {
    if (n >= Math.pow(16, i)) {
      var t = Math.floor(n / Math.pow(16, i));
      n -= t * Math.pow(16, i);
      if ( t >= 10 ) {
        if ( t == 10 ) { h += "A"; }
        if ( t == 11 ) { h += "B"; }
        if ( t == 12 ) { h += "C"; }
        if ( t == 13 ) { h += "D"; }
        if ( t == 14 ) { h += "E"; }
        if ( t == 15 ) { h += "F"; }
      } else {
        h += String(t);
      }
    } else {
      h += "0";
    }
  }
  return h;
}

