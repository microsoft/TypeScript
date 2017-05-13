// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * [[Get]], [[Delete]] from not an inherited property
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A6_T2.js
 * @description [[Prototype]] of Array instance is Array.prototype, [[Prototype] of Array.prototype is Object.prototype
 */

Array.prototype[1] = -1;
var x = [1,0];
x.length = 2;
x.sort();

//CHECK#1
if (x[0] !== 0) {  
  $ERROR('#1: Array.prototype[1] = -1; x = [1,0]; x.length = 2; x.sort(); x[0] === 0. Actual: ' + (x[0]));    
}

//CHECK#2
if (x[1] !== 1) {  
  $ERROR('#2: Array.prototype[1] = -1; x = [1,0]; x.length = 2; x.sort(); x[1] === 1. Actual: ' + (x[1]));    
}

x.length = 0;

//CHECK#3
if (x[0] !== undefined) {  
  $ERROR('#3: Array.prototype[1] = -1; x = [1,0]; x.length = 2; x.sort(); x.length = 0; x[0] === undefined. Actual: ' + (x[0]));    
}

//CHECK#4
if (x[1] !== -1) {  
  $ERROR('#4: Array.prototype[1] = -1; x = [1,0]; x.length = 2; x.sort(); x.length = 0; x[1] === -1. Actual: ' + (x[1]));    
}

Object.prototype[1] = -1;
Object.prototype.length = 2;
Object.prototype.sort = Array.prototype.sort;
x = {0:1,1:0};
x.sort();

//CHECK#5
if (x[0] !== 0) {  
  $ERROR('#5: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.sort = Array.prototype.sort; x = {0:1,1:0}; x.sort(); x[0] === 0. Actual: ' + (x[0]));    
}

//CHECK#6
if (x[1] !== 1) {  
  $ERROR('#6: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.sort = Array.prototype.sort; x = {0:1,1:0}; x.sort(); x[1] === 1. Actual: ' + (x[1]));    
}

delete x[0];
delete x[1];

//CHECK#7
if (x[0] !== undefined) {  
  $ERROR('#7: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.sort = Array.prototype.sort; x = {0:1,1:0}; x.sort(); delete x[0]; delete x[1]; x[0] === undefined. Actual: ' + (x[0]));    
}

//CHECK#8
if (x[1] !== -1) {  
  $ERROR('#8: Object.prototype[1] = -1; Object.prototype.length = 2; Object.prototype.sort = Array.prototype.sort; x = {0:1,1:0}; x.sort(); delete x[0]; delete x[1]; x[1] === -1. Actual: ' + (x[1]));    
}

