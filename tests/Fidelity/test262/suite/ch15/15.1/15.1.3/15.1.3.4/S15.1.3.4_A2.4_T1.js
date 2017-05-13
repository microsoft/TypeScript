// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If string.charAt(k) in [0xD800 - 0xDBFF] and string.charAt(k+1) in [0xDC00 � 0xDFFF], return 4 octets (000wwwxx xxxxyyyy yyzzzzzz -> 11110www 10xxxxxx 10yyyyyy 10zzzzzz)
 *
 * @path ch15/15.1/15.1.3/15.1.3.4/S15.1.3.4_A2.4_T1.js
 * @description Complex tests, use RFC 3629, string.charAt(k+1) in [0xDC00, 0xDDFF, 0xDFFF]
 */

chars = [0xDC00, 0xDDFF, 0xDFFF]; 
errorCount = 0;
count = 0;
var indexP;
var indexO = 0; 
for (index = 0xD800; index <= 0xDBFF; index++) {
  res = true;
  for (indexC = 0; indexC < chars.length; indexC++) {
    index1 = (index - 0xD800) * 0x400 + (chars[indexC] - 0xDC00) + 0x10000; 
    hex1 = decimalToHexString(0x0080 + (index1 & 0x003F)).substring(2);
    hex2 = decimalToHexString(0x0080 + (index1 & 0x0FC0) / 0x0040).substring(2);
    hex3 = decimalToHexString(0x0080 + (index1 & 0x3F000) / 0x1000).substring(2);
    hex4 = decimalToHexString(0x00F0 + (index1 & 0x1C0000) / 0x40000).substring(2);
    str = String.fromCharCode(index, chars[indexC]);
    try {
      if (encodeURIComponent(str).toUpperCase() !== "%" + hex4 + "%" + hex3 + "%" + hex2 + "%" + hex1) {
        res = false;
      }
    } catch(e) {res = false}    
  }
  if (res !== true) {  
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

