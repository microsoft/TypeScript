// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The unshift function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.13/S15.4.4.13_A2_T1.js
 * @description The arguments are prepended to the start of the array, such that
 * their order within the array is the same as the order in which they appear in
 * the argument list
 */

var obj = {};
obj.unshift = Array.prototype.unshift;

if (obj.length !== undefined) {
  $ERROR('#0: var obj = {}; obj.length === undefined. Actual: ' + (obj.length));
} else {
    //CHECK#1
    var unshift = obj.unshift(-1);  
    if (unshift !== 1) {
      $ERROR('#1: var obj = {}; obj.unshift = Array.prototype.unshift; obj.unshift(-1) === 1. Actual: ' + (unshift));
    }
    //CHECK#2
    if (obj.length !== 1) {
      $ERROR('#2: var obj = {}; obj.unshift = Array.prototype.unshift; obj.unshift(-1); obj.length === 1. Actual: ' + (obj.length));
    }
    //CHECK#3
    if (obj["0"] !== -1) {
      $ERROR('#3: var obj = {}; obj.unshift = Array.prototype.unshift; obj.unshift(-1); obj["0"] === -1. Actual: ' + (obj["0"]));
    }
} 

//CHECK#4
obj.length = undefined;
var unshift = obj.unshift(-4);
if (unshift !== 1) {
  $ERROR('#4: var obj = {}; obj.length = undefined; obj.unshift = Array.prototype.unshift; obj.unshift(-4) === 1. Actual: ' + (unshift));
} 

//CHECK#5
if (obj.length !== 1) {
  $ERROR('#5: var obj = {}; obj.length = undefined; obj.unshift = Array.prototype.unshift; obj.unshift(-4); obj.length === 1. Actual: ' + (obj.length));
}

//CHECK#6
if (obj["0"] !== -4) {
  $ERROR('#6: var obj = {}; obj.length = undefined; obj.unshift = Array.prototype.unshift; obj.unshift(-4); obj["0"] === -4. Actual: ' + (obj["0"]));
}

//CHECK#7
obj.length = null
var unshift = obj.unshift(-7);
if (unshift !== 1) {
  $ERROR('#7: var obj = {}; obj.length = null; obj.unshift = Array.prototype.unshift; obj.unshift(-7) === 1. Actual: ' + (unshift));
} 

//CHECK#8
if (obj.length !== 1) {
  $ERROR('#8: var obj = {}; obj.length = null; obj.unshift = Array.prototype.unshift; obj.unshift(-7); obj.length === 1. Actual: ' + (obj.length));
}

//CHECK#9
if (obj["0"] !== -7) {
  $ERROR('#9: var obj = {}; obj.length = null; obj.unshift = Array.prototype.unshift; obj.unshift(-7); obj["0"] === -7. Actual: ' + (obj["0"]));
}

