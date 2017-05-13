// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * [[Get]] from not an inherited property
 *
 * @path ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A4_T1.js
 * @description [[Prototype]] of Array instance is Array.prototype
 */

Array.prototype[1] = 1;
var x = [0];
x.length = 2;
var arr = x.slice();

//CHECK#1
if (arr[0] !== 0) {  
  $ERROR('#1: Array.prototype[1] = 1; x = [0]; x.length = 2; var arr = x.slice(); arr[0] === 0. Actual: ' + (arr[0]));    
}

//CHECK#2
if (arr[1] !== 1) {  
  $ERROR('#2: Array.prototype[1] = 1; x = [0]; x.length = 2; var arr = x.slice(); arr[1] === 1. Actual: ' + (arr[1]));    
}

//CHECK#3
if (arr.hasOwnProperty('1') !== true) {  
  $ERROR('#3: Array.prototype[1] = 1; x = [0]; x.length = 2; var arr = x.slice(); arr.hasOwnProperty(\'1\') === true. Actual: ' + (arr.hasOwnProperty('1')));    
}

