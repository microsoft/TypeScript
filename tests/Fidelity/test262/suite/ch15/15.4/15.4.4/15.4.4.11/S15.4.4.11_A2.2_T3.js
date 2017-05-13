// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * My comparefn is inverse implementation comparefn
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A2.2_T3.js
 * @description Checking ToString operator
 */

var obj = {valueOf: function() {return 1}, toString: function() {return -2}}; 
var alphabetR = [undefined, 2, 1, "X", -1, "a", true, obj, NaN, Infinity]; 
var alphabet = [true, "a", "X", NaN, Infinity, 2, 1, obj, -1, undefined];

var myComparefn = function(x,y) {
  var xS = String(x);
  var yS = String(y);
  if (xS < yS) return 1
  if (xS > yS) return -1;   
  return 0;
}
 
//CHECK#1
alphabetR.sort(myComparefn);
var result = true;
for (var i = 0; i < 10; i++) {
  if (!(isNaN(alphabetR[i]) && isNaN(alphabet[i]))) { 
    if (alphabetR[i] !== alphabet[i]) result = false;
  }  
}

if (result !== true) {
  $ERROR('#1: Check ToString operator');
}

