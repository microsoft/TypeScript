// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * [[Get]] from not an inherited property
 *
 * @path ch15/15.4/15.4.4/15.4.4.7/S15.4.4.7_A5_T1.js
 * @description [[Prototype]] of Array instance is Array.prototype, [[Prototype] of Array.prototype is Object.prototype
 */

Object.prototype[1] = -1;
Object.prototype.length = 1;
Object.prototype.push = Array.prototype.push;
var x = {0:0};

//CHECK#1
var push = x.push(1);
if (push !== 2) {  
  $ERROR('#1: Object.prototype[1] = 1; Object.prototype.length = -1; Object.prototype.push = Array.prototype.push; x = {0:0}; x.push(1) === 2. Actual: ' + (push));    
}

//CHECK#2
if (x.length !== 2) {  
  $ERROR('#2: Object.prototype[1] = 1; Object.prototype.length = -1; Object.prototype.push = Array.prototype.push; x = {0:0}; x.push(1); x.length === 2. Actual: ' + (x.length));    
}

//CHECK#3
if (x[1] !== 1) {  
  $ERROR('#3: Object.prototype[1] = 1; Object.prototype.length = -1; Object.prototype.push = Array.prototype.push; x = {0:0}; x.push(1); x[1] === 1. Actual: ' + (x[1]));    
}

//CHECK#4
delete x[1];
if (x[1] !== -1) {  
  $ERROR('#4: Object.prototype[1] = 1; Object.prototype.length = -1; Object.prototype.push = Array.prototype.push; x = {0:0}; x.push(1); delete x[1]; x[1] === -1. Actual: ' + (x[1]));    
}

//CHECK#5
delete x.length;
if (x.length !== 1) {  
  $ERROR('#5: Object.prototype[1] = 1; Object.prototype.length = -1; Object.prototype.push = Array.prototype.push; x = {0:0}; delete x; x.push(1); x.length === 1. Actual: ' + (x.length));    
}


