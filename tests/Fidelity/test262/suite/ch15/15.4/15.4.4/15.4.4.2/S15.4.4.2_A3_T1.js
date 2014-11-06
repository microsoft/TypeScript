// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * [[Get]] from not an inherited property
 *
 * @path ch15/15.4/15.4.4/15.4.4.2/S15.4.4.2_A3_T1.js
 * @description [[Prototype]] of Array instance is Array.prototype
 */

//CHECK#1
Array.prototype[1] = 1;
var x = [0];
x.length = 2;
if (x.toString() !== "0,1") {  
  $ERROR('#1: Array.prototype[1] = 1; x = [0]; x.length = 2; x.toString() === "0,1". Actual: ' + (x.toString()));    
}

