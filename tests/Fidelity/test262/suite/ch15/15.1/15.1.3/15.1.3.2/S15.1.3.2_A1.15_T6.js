// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If B = 11110xxx (n = 4) and C != 10xxxxxx (C - first of octets after B), throw URIError
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A1.15_T6.js
 * @description Complex tests. B = [0xF0 - 0x0F7], C = [0xC0, 0xFF]
 */

errorCount = 0;
count = 0;
var indexP;
var indexO = 0;

for (indexB = 0xF0; indexB <= 0xF7; indexB++) {
  count++; 
  hexB = decimalToHexString(indexB); 
  result = true;
  for (indexC = 0xC0; indexC <= 0xFF; indexC++) {
    hexC = decimalToHexString(indexC);  
    try {
      decodeURIComponent("%" + hexB.substring(2) + "%A0%A0" + "%" + hexC.substring(2));
    } catch (e) { 
      if ((e instanceof URIError) === true) continue;                
    }
    result = false;
  }
  if (result !== true) {
    if (indexO === 0) { 
      indexO = indexB;
    } else {
      if ((indexB - indexP) !== 1) {             
        if ((indexP - indexO) !== 0) {
          var hexP = decimalToHexString(indexP);
          var hexO = decimalToHexString(indexO);
          $ERROR('#' + hexO + '-' + hexP + ' ');
        } 
        else {
          var hexP = decimalToHexString(indexP);
          $ERROR('#' + hexP + ' ');
        }  
        indexO = indexB;
      }         
    }
    indexP = indexB;
    errorCount++;       
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

