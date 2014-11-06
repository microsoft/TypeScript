// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If B = 1110xxxx (n = 3) and string.charAt(k + 3),
 * string.charAt(k + 6) not equal "%", throw URIError
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A1.8_T1.js
 * @description Complex tests. B = [0xE0 - 0xEF],
 * string.charAt(k + 3) not equal "%"
 */

errorCount = 0;
count = 0;
var indexP;
var indexO = 0;

for (index = 0xE0; index <= 0xEF; index++) {
  count++; 
  hex = decimalToHexString(index);
  try {
    decodeURIComponent("%" + hex.substring(2) + "111%A0");
  } catch (e) { 
    if ((e instanceof URIError) === true) continue;                
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

