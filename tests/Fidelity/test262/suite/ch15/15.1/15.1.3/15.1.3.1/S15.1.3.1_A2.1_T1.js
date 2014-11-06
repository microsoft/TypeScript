// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If string.charAt(k) not equal "%", return this char
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A2.1_T1.js
 * @description Complex tests
 */

//CHECK
var errorCount = 0;
var count = 0;
for (var indexI = 0; indexI <= 65535; indexI++) {
  if (indexI !== 0x25) {
    var hex = decimalToHexString(indexI);
    try {    
      var str = String.fromCharCode(indexI);
      if (decodeURI(str) !== str) {    
        $ERROR('#' + hex + ' ');
        errorCount++;
      }    
    } catch (e){
      $ERROR('#' + hex + ' ');
      errorCount++;
    } 
    count++;
  }
}  

if (errorCount > 0) {    
  $ERROR('Total error: ' + errorCount + ' bad Unicode character in ' + count);
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

