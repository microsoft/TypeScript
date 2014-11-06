// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The join function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A2_T2.js
 * @description If ToUint32(length) is zero, return the empty string
 */

var obj = {};
obj.join = Array.prototype.join;

//CHECK#1
obj.length = NaN;
if (obj.join() !== "") {
  $ERROR('#1: var obj = {}; obj.length = NaN; obj.join = Array.prototype.join; obj.join() === "". Actual: ' + (obj.join()));
}

//CHECK#2
if (isNaN(obj.length) !== true) {
  $ERROR('#2: var obj = {}; obj.length = NaN; obj.join = Array.prototype.join; obj.join(); obj.length === Not-a-Number. Actual: ' + (obj.length));
}

//CHECK#3
obj.length = Number.POSITIVE_INFINITY;
if (obj.join() !== "") {
  $ERROR('#3: var obj = {}; obj.length = Number.POSITIVE_INFINITY; obj.join = Array.prototype.join; obj.join() === "". Actual: ' + (obj.join()));
}

//CHECK#4
if (obj.length !== Number.POSITIVE_INFINITY) {
  $ERROR('#4: var obj = {}; obj.length = Number.POSITIVE_INFINITY; obj.join = Array.prototype.join; obj.join(); obj.length === Number.POSITIVE_INFINITY. Actual: ' + (obj.length));
}

//CHECK#5
obj.length = Number.NEGATIVE_INFINITY;
if (obj.join() !== "") {
  $ERROR('#5: var obj = {}; obj.length = Number.NEGATIVE_INFINITY; obj.join = Array.prototype.join; obj.join() === "". Actual: ' + (obj.join()));
}

//CHECK#6
if (obj.length !== Number.NEGATIVE_INFINITY) {
  $ERROR('#6: var obj = {}; obj.length = Number.NEGATIVE_INFINITY; obj.join = Array.prototype.join; obj.join(); obj.length === Number.NEGATIVE_INFINITY. Actual: ' + (obj.length));
}

//CHECK#7
obj.length = -0;
if (obj.join() !== "") {
  $ERROR('#7: var obj = {}; obj.length = -0; obj.join = Array.prototype.join; obj.join() === "". Actual: ' + (obj.join()));
}    

//CHECK#8
if (obj.length !== -0) {
  $ERROR('#8: var obj = {}; obj.length = -0; obj.join = Array.prototype.join; obj.join(); obj.length === 0. Actual: ' + (obj.length));
} else {
  if (1/obj.length !== Number.NEGATIVE_INFINITY) {
    $ERROR('#8: var obj = {}; obj.length = -0; obj.join = Array.prototype.join; obj.join(); obj.length === -0. Actual: ' + (obj.length));
  }  
}   

//CHECK#9
obj.length = 0.5;
if (obj.join() !== "") {
  $ERROR('#9: var obj = {}; obj.length = 0.5; obj.join = Array.prototype.join; obj.join() === "". Actual: ' + (obj.join()));
}

//CHECK#10
if (obj.length !== 0.5) {
  $ERROR('#10: var obj = {}; obj.length = 0.5; obj.join = Array.prototype.join; obj.join(); obj.length === 0.5. Actual: ' + (obj.length));
} 

//CHECK#11
var x = new Number(0);
obj.length = x;
if (obj.join() !== "") {
  $ERROR('#11: var x = new Number(0); var obj = {}; obj.length = x; obj.join = Array.prototype.join; obj.join() === "". Actual: ' + (obj.join()));
}

//CHECK#12
if (obj.length !== x) {
  $ERROR('#12: var x = new Number(0); var obj = {}; obj.length = x; obj.join = Array.prototype.join; obj.join(); obj.length === x. Actual: ' + (obj.length));
}

