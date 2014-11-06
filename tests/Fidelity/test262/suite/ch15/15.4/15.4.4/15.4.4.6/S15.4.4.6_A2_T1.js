// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The pop function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.6/S15.4.4.6_A2_T1.js
 * @description If ToUint32(length) equal zero, call the [[Put]] method
 * of this object with arguments "length" and 0 and return undefined
 */

var obj = {};
obj.pop = Array.prototype.pop;

if (obj.length !== undefined) {
  $ERROR('#0: var obj = {}; obj.length === undefined. Actual: ' + (obj.length));
} else {
    //CHECK#1  
    var pop = obj.pop();
if (pop !== undefined) {
      $ERROR('#1: var obj = {}; obj.pop = Array.prototype.pop; obj.pop() === undefined. Actual: ' + (pop));
    }
    //CHECK#2
    if (obj.length !== 0) {
      $ERROR('#2: var obj = {}; obj.pop = Array.prototype.pop; obj.pop(); obj.length === 0. Actual: ' + (obj.length));
    }
}    

//CHECK#3
obj.length = undefined;
var pop = obj.pop();
if (pop !== undefined) {
  $ERROR('#3: var obj = {}; obj.length = undefined; obj.pop = Array.prototype.pop; obj.pop() === undefined. Actual: ' + (pop));
} 

//CHECK#4
if (obj.length !== 0) {
  $ERROR('#4: var obj = {}; obj.length = undefined; obj.pop = Array.prototype.pop; obj.pop(); obj.length === 0. Actual: ' + (obj.length));
}

//CHECK#5
obj.length = null
var pop = obj.pop();
if (pop !== undefined) {
  $ERROR('#5: var obj = {}; obj.length = null; obj.pop = Array.prototype.pop; obj.pop() === undefined. Actual: ' + (pop));
} 

//CHECK#6
if (obj.length !== 0) {
  $ERROR('#6: var obj = {}; obj.length = null; obj.pop = Array.prototype.pop; obj.pop(); obj.length === 0. Actual: ' + (obj.length));
}

