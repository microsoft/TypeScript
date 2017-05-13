// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The shift function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A2_T2.js
 * @description If ToUint32(length) equal zero, call the [[Put]] method
 * of this object with arguments "length" and 0 and return undefined
 */

var obj = {};
obj.shift = Array.prototype.shift;

//CHECK#1
obj.length = NaN;
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#1: var obj = {}; obj.length = NaN; obj.shift = Array.prototype.shift; obj.shift() === undefined. Actual: ' + (shift));
}

//CHECK#2
if (obj.length !== 0) {
  $ERROR('#2: var obj = {}; obj.length = NaN; obj.shift = Array.prototype.shift; obj.shift(); obj.length === 0. Actual: ' + (obj.length));
}

//CHECK#3
obj.length = Number.POSITIVE_INFINITY;
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#3: var obj = {}; obj.length = Number.POSITIVE_INFINITY; obj.shift = Array.prototype.shift; obj.shift() === undefined. Actual: ' + (shift));
}

//CHECK#4
if (obj.length !== 0) {
  $ERROR('#4: var obj = {}; obj.length = Number.POSITIVE_INFINITY; obj.shift = Array.prototype.shift; obj.shift(); obj.length === 0. Actual: ' + (obj.length));
}

//CHECK#5
obj.length = Number.NEGATIVE_INFINITY;
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#5: var obj = {}; obj.length = Number.NEGATIVE_INFINITY; obj.shift = Array.prototype.shift; obj.shift() === undefined. Actual: ' + (shift));
}

//CHECK#6
if (obj.length !== 0) {
  $ERROR('#6: var obj = {}; obj.length = Number.NEGATIVE_INFINITY; obj.shift = Array.prototype.shift; obj.shift(); obj.length === 0. Actual: ' + (obj.length));
}

//CHECK#7
obj.length = -0;
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#7: var obj = {}; obj.length = -0; obj.shift = Array.prototype.shift; obj.shift() === undefined. Actual: ' + (shift));
}    

//CHECK#8
if (obj.length !== 0) {
  $ERROR('#8: var obj = {}; obj.length = -0; obj.shift = Array.prototype.shift; obj.shift(); obj.length === 0. Actual: ' + (obj.length));
} else {
  if (1/obj.length !== Number.POSITIVE_INFINITY) {
    $ERROR('#8: var obj = {}; obj.length = -0; obj.shift = Array.prototype.shift; obj.shift(); obj.length === +0. Actual: ' + (obj.length));
  }  
}   

//CHECK#9
obj.length = 0.5;
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#9: var obj = {}; obj.length = 0.5; obj.shift = Array.prototype.shift; obj.shift() === undefined. Actual: ' + (shift));
}

//CHECK#10
if (obj.length !== 0) {
  $ERROR('#10: var obj = {}; obj.length = 0.5; obj.shift = Array.prototype.shift; obj.shift(); obj.length === 0. Actual: ' + (obj.length));
} 

//CHECK#11
obj.length = new Number(0);
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#11: var obj = {}; obj.length = new Number(0); obj.shift = Array.prototype.shift; obj.shift() === undefined. Actual: ' + (shift));
}

//CHECK#12
if (obj.length !== 0) {
  $ERROR('#12: var obj = {}; obj.length = new Number(0); obj.shift = Array.prototype.shift; obj.shift(); obj.length === 0. Actual: ' + (obj.length));
}

