// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If string.charAt(k) in [0x0000 - 0x007F]\[uriReserved, uriUnescaped, #], return 1 octet (00000000 0zzzzzzz -> 0zzzzzzz)
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A2.1_T1.js
 * @description Complex tests, use RFC 3629
 */

uriReserved = [";", "/", "?", ":", "@", "&", "=", "+", "$", ","];
uriUnescaped = ["-", "_", ".", "!", "~", "*", "'", "(", ")", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; 
errorCount = 0;
count = 0;
var indexP;
var indexO = 0;

l : 
for (index = 0x0000; index <= 0x007F; index++) {
  count++;
  str = String.fromCharCode(index);
  for (indexC = 0; indexC < uriReserved.length; indexC++) {    
    if (uriReserved[indexC] === str) continue l;
  }
   for (indexC = 0; indexC < uriUnescaped.length; indexC++) {
    if (uriUnescaped[indexC] === str) continue l;
  }    
  if ("#" === str) continue l; 
  try {
    if (encodeURI(str).toUpperCase() === "%" + decimalToHexString(index).substring(2)) continue l; 
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

