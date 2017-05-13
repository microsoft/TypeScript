// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToUint32(P) is less than the value of
 * the length property of A, then return
 *
 * @path ch15/15.4/15.4.5/15.4.5.1/S15.4.5.1_A2.2_T1.js
 * @description length === 100, P in [0, 98, 99]
 */

//CHECK#1
var x = Array(100);
x[0] = 1;
if (x.length !== 100) {  
  $ERROR('#1: x = Array(100); x[0] = 1; x.length === 100. Actual: ' + (x.length));    
}

//CHECK#2
x[98] = 1;
if (x.length !== 100) {  
  $ERROR('#2: x = Array(100); x[0] = 1; x[98] = 1; x.length === 100. Actual: ' + (x.length));    
}

//CHECK#3
x[99] = 1;
if (x.length !== 100) {  
  $ERROR('#3: x = Array(100); x[0] = 1; x[98] = 1; x[99] = 1; x.length === 100. Actual: ' + (x.length));    
}

