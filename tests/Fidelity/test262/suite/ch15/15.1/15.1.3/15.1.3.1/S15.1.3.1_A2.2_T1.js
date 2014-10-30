// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If B1 = 0xxxxxxxx ([0x00 - 0x7F]), without [uriReserved, #], return B1
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A2.2_T1.js
 * @description Complex tests, use RFC 3629
 */

var errorCount = 0;
var count = 0;
var indexP;
var indexO = 0;
var uriReserved = [";", "/", "?", ":", "@", "&", "=", "+", "$", ","];
l:
for (var indexB1 = 0x00; indexB1 <= 0x7F; indexB1++) {       
  count++;
  var hexB1 = decimalToHexString(indexB1);  
  var index = indexB1;  
  try {
    var hex = String.fromCharCode(index);
    for (indexC = 0; indexC < uriReserved.length; indexC++) {    
      if (hex === uriReserved[indexC]) continue l;        
    } 
    if (hex === "#") continue l;
    if (decodeURI("%" + hexB1.substring(2)) === hex) continue;
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

