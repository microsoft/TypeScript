// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If B1 = 1110xxxx ([0xE0 - 0xEF]), B2, B3 = 10xxxxxxx ([0x80 - 0xBF]), without [B1, B2] = [0xE0, 0x80 - 0x9F], [0xED, 0xA0 - 0xBF] (0xD800 - 0xDFFF), return UTF8(B1, B2, B3)
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A2.4_T1.js
 * @description Complex tests, use RFC 3629
 */

var errorCount = 0;
var count = 0;
var indexP;
var indexO = 0;

for (var indexB1 = 0xE0; indexB1 <= 0xEF; indexB1++) {     
  var hexB1 = decimalToHexString(indexB1);
  for (var indexB2 = 0x80; indexB2 <= 0xBF; indexB2++) {
    if ((indexB1 === 0xE0) && (indexB2 <= 0x9F)) continue;
    if ((indexB1 === 0xED) && (0xA0 <= indexB2)) continue;         
    var hexB2 = decimalToHexString(indexB2);
    for (var indexB3 = 0x80; indexB3 <= 0xBF; indexB3++) {
      count++;
      var hexB3 = decimalToHexString(indexB3);
      var index = (indexB1 & 0x0F) * 0x1000 + (indexB2 & 0x3F) * 0x40 + (indexB3 & 0x3F);  
      try {
        if (decodeURI("%" + hexB1.substring(2) + "%" + hexB2.substring(2) + "%" + hexB3.substring(2)) === String.fromCharCode(index)) continue;
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

