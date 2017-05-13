// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The sort function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A3_T1.js
 * @description If comparefn is undefined, use SortCompare operator
 */

var obj = {valueOf: function() {return 1}, toString: function() {return -2}};
var alphabetR = {0:undefined, 1:2, 2:1, 3:"X", 4:-1, 5:"a", 6:true, 7:obj, 8:NaN, 9:Infinity};
alphabetR.sort = Array.prototype.sort; 
alphabetR.length = 10;
var alphabet = [-1, obj, 1, 2, Infinity, NaN, "X", "a", true, undefined];
  
alphabetR.sort();

 //CHECK#0
alphabetR.getClass = Object.prototype.toString;
if (alphabetR.getClass() !== "[object " + "Object" + "]") {
  $ERROR('#0: alphabetR.sort() is Object object, not Array object');
}
 
//CHECK#1
var result = true;
for (var i = 0; i < 10; i++) {
  if (!(isNaN(alphabetR[i]) && isNaN(alphabet[i]))) { 
    if (alphabetR[i] !== alphabet[i]) result = false;
  }  
}

if (result !== true) {
  $ERROR('#1: Check ToString operator');
} 

