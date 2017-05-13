// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * * If ToString([[Get]] ToString(j)) < ToString([[Get]] ToString(k)), return -1.
 * If ToString([[Get]] ToString(j)) > ToString([[Get]] ToString(k)), return 1;
 * return -1
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A2.1_T3.js
 * @description Checking ToString operator
 */

var obj = {valueOf: function() {return 1}, toString: function() {return -2}};
var alphabetR = [undefined, 2, 1, "X", -1, "a", true, obj, NaN, Infinity]; 
var  alphabet = [-1, obj, 1, 2, Infinity, NaN, "X", "a", true, undefined];
 
//CHECK#1
alphabetR.sort();
var result = true;
for (var i = 0; i < 10; i++) {
  if (!(isNaN(alphabetR[i]) && isNaN(alphabet[i]))) { 
    if (alphabetR[i] !== alphabet[i]) result = false;
  }  
}

if (result !== true) {
  $ERROR('#1: Check ToString operator');
}

