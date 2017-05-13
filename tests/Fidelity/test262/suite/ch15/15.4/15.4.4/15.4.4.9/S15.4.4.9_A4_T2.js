// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * [[Get]], [[Delete]] from not an inherited property
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A4_T2.js
 * @description [[Prototype]] of Array instance is Array.prototype, [[Prototype] of Array.prototype is Object.prototype
 */

Array.prototype[1] = -1;
var x = [0,1];
x.length = 2;

//CHECK#1
var shift = x.shift();
if (shift !== 0) {  
  $ERROR('#1: Array.prototype[1] = -1; x = [0,1]; x.length = 2; x.shift() === 0. Actual: ' + (shift));    
}

//CHECK#2
if (x[0] !== 1) {  
  $ERROR('#2: Array.prototype[1] = -1; x = [0,1]; x.length = 2; x.shift(); x[0] === 1. Actual: ' + (x[0]));    
}

//CHECK#3
if (x[1] !== -1) {  
  $ERROR('#3: Array.prototype[1] = -1; x = [0,1]; x.length = 2; x.shift(); x[1] === -1. Actual: ' + (x[1]));    
}

Object.prototype[1] = -1;
Object.prototype.length = 2;
Object.prototype.shift = Array.prototype.shift;
x = {0:0,1:1};

//CHECK#4
var shift = x.shift();
if (shift !== 0) {  
  $ERROR('#4: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.shift = Array.prototype.shift; x = {0:0,1:1}; x.shift() === 0. Actual: ' + (shift));    
}

//CHECK#5
if (x[0] !== 1) {  
  $ERROR('#5: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.shift = Array.prototype.shift; x = {0:0,1:1}; x.shift(); x[0] === 1. Actual: ' + (x[0]));    
}

//CHECK#6
if (x[1] !== -1) {  
  $ERROR('#6: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.shift = Array.prototype.shift; x = {0:0,1:1}; x.shift(); x[1] === -1. Actual: ' + (x[1]));    
}

//CHECK#7
if (x.length !== 1) {  
  $ERROR('#7: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.shift = Array.prototype.shift; x = {0:0,1:1}; x.shift(); x.length === 1. Actual: ' + (x.length));    
}

//CHECK#8
delete x.length;
if (x.length !== 2) {  
  $ERROR('#8: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.shift = Array.prototype.shift; x = {0:0,1:1}; x.shift(); delete x; x.length === 2. Actual: ' + (x.length));    
}

