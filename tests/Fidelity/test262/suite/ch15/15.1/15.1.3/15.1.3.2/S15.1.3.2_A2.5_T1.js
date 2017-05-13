// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If B1 = 11110xxx ([0xF0 - 0x0F4]), B2, B3, B4 = 10xxxxxxx ([0x80 - 0xBF]), without [B1, B2] = [0xF0, 0x80 - 0x9F], [0xF4, 0x90 - 0xBF], return UTF8(B1, B2, B3, B4)
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A2.5_T1.js
 * @description Complex tests, use RFC 3629
 */

errorCount = 0;
count = 0;
var indexP;
var indexO = 0;

for (indexB1 = 0xF0; indexB1 <= 0xF4; indexB1++) {     
  var hexB1 = decimalToHexString(indexB1);
  for (indexB2 = 0x80; indexB2 <= 0xBF; indexB2++) {
    if ((indexB1 === 0xF0) && (indexB2 <= 0x9F)) continue;            
    if ((indexB1 === 0xF4) && (indexB2 >= 0x90)) continue;
    var hexB2 = decimalToHexString(indexB2);
    for (indexB3 = 0x80; indexB3 <= 0xBF; indexB3++) {
      var hexB3 = decimalToHexString(indexB3);
      for (indexB4 = 0x80; indexB4 <= 0xBF; indexB4++) {
        var hexB4 = decimalToHexString(indexB4);
        count++;
        var index = (indexB1 & 0x07) * 0x40000 + (indexB2 & 0x3F) * 0x1000 + (indexB3 & 0x3F) * 0x40 + (indexB4 & 0x3F);
        var L = ((index - 0x10000) & 0x03FF) + 0xDC00;
        var H = (((index - 0x10000) >> 10) & 0x03FF) + 0xD800;  
        try {
          if (decodeURIComponent("%" + hexB1.substring(3) + "%" + hexB2.substring(3) + "%" + hexB3.substring(3) + "%" + hexB4.substring(3)) === String.fromCharCode(H) + String.fromCharCode(L)) continue;
        } catch (e) {
          if (e instanceof Test262Error) throw e;
        }   
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
    }     
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
  for (var i = 4; i >= 0; i--) {
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

