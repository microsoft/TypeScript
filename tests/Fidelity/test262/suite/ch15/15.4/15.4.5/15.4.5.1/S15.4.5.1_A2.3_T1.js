// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToUint32(P) is less than the value of
 * the length property of A, change (or set) length to ToUint32(P)+1
 *
 * @path ch15/15.4/15.4.5/15.4.5.1/S15.4.5.1_A2.3_T1.js
 * @description length = 100, P in [100, 199]
 */

//CHECK#1
var x = Array(100);
x[100] = 1;
if (x.length !== 101) {  
  $ERROR('#1: x = Array(100); x[100] = 1; x.length === 101. Actual: ' + (x.length));    
}

//CHECK#2
x[199] = 1;
if (x.length !== 200) {  
  $ERROR('#2: x = Array(100); x[100] = 1; x[199] = 1; x.length === 100. Actual: ' + (x.length));    
}

