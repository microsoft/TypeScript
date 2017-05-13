// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The push function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.7/S15.4.4.7_A2_T1.js
 * @description The arguments are appended to the end of the array, in
 * the order in which they appear. The new length of the array is returned
 * as the result of the call
 */

var obj = {};
obj.push = Array.prototype.push;

if (obj.length !== undefined) {
  $ERROR('#0: var obj = {}; obj.length === undefined. Actual: ' + (obj.length));
} else {
    //CHECK#1  
    var push = obj.push(-1);
if (push !== 1) {
      $ERROR('#1: var obj = {}; obj.push = Array.prototype.push; obj.push(-1) === 1. Actual: ' + (push));
    }
    //CHECK#2
    if (obj.length !== 1) {
      $ERROR('#2: var obj = {}; obj.push = Array.prototype.push; obj.push(-1); obj.length === 1. Actual: ' + (obj.length));
    }
    //CHECK#3
    if (obj["0"] !== -1) {
      $ERROR('#3: var obj = {}; obj.push = Array.prototype.push; obj.push(-1); obj["0"] === -1. Actual: ' + (obj["0"]));
    }
} 

//CHECK#4
obj.length = undefined;
var push = obj.push(-4);
if (push !== 1) {
  $ERROR('#4: var obj = {}; obj.length = undefined; obj.push = Array.prototype.push; obj.push(-4) === 1. Actual: ' + (push));
} 

//CHECK#5
if (obj.length !== 1) {
  $ERROR('#5: var obj = {}; obj.length = undefined; obj.push = Array.prototype.push; obj.push(-4); obj.length === 1. Actual: ' + (obj.length));
}

//CHECK#6
if (obj["0"] !== -4) {
  $ERROR('#6: var obj = {}; obj.length = undefined; obj.push = Array.prototype.push; obj.push(-4); obj["0"] === -4. Actual: ' + (obj["0"]));
}

//CHECK#7
obj.length = null
var push = obj.push(-7);
if (push !== 1) {
  $ERROR('#7: var obj = {}; obj.length = null; obj.push = Array.prototype.push; obj.push(-7) === 1. Actual: ' + (push));
} 

//CHECK#8
if (obj.length !== 1) {
  $ERROR('#8: var obj = {}; obj.length = null; obj.push = Array.prototype.push; obj.push(-7); obj.length === 1. Actual: ' + (obj.length));
}

//CHECK#9
if (obj["0"] !== -7) {
  $ERROR('#9: var obj = {}; obj.length = null; obj.push = Array.prototype.push; obj.push(-7); obj["0"] === -7. Actual: ' + (obj["0"]));
}

