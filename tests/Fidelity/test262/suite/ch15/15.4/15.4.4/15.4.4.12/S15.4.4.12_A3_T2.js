// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check ToUint32(length) for non Array objects
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A3_T2.js
 * @description length is arbitrarily
 */

var obj = {};
obj.splice = Array.prototype.splice;
obj[0] = "x";
obj.length = 4294967297;
var arr = obj.splice(0,1);

//CHECK#1
if (arr.length !== 1) {
  $ERROR('#1: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[0] = "y"; obj.length = 4294967297; var arr = obj.splice(0,1); arr.length === 1. Actual: ' + (arr.length));
}

//CHECK#2
if (arr[0] !== "x") {
   $ERROR('#2: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[0] = "y"; obj.length = 1; var arr = obj.splice(0,1); arr[0] === "x". Actual: ' + (arr[0]));
} 

//CHECK#3
if (obj.length !== 0) {
   $ERROR('#3: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[0] = "y"; obj.length = 1; var arr = obj.splice(0,1); obj.length === 0. Actual: ' + (obj.length));
}

//CHECK#4
if (obj[0] !== undefined) {
   $ERROR('#4: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[0] = "y"; obj.length = 1; var arr = obj.splice(0,1); obj[0] === undefined. Actual: ' + (obj[0]));
} 

