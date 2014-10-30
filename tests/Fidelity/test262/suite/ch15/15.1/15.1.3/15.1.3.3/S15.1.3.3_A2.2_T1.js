// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If string.charAt(k) in [0x0080 - 0x07FF], return 2 octets (00000yyy yyzzzzzz -> 110yyyyy 10zzzzzz)
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A2.2_T1.js
 * @description Complex tests, use RFC 3629
 */

errorCount = 0;
count = 0;
var indexP;
var indexO = 0; 
l:
for (index = 0x0080; index <= 0x07FF; index++) {
  count++;  
  hex1 = decimalToHexString(0x0080 + (index & 0x003F)).substring(2);
  hex2 = decimalToHexString(0x00C0 + (index & 0x07C0) / 0x0040).substring(2);    
  str = String.fromCharCode(index);
  try {
    if (encodeURI(str).toUpperCase() === "%" + hex2 + "%" + hex1) continue;
  } catch(e) {}  
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

