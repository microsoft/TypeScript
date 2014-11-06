// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check ToUint32(length) for non Array objects
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A3_T1.js
 * @description length is arbitrarily
 */

var obj = {};
obj.splice = Array.prototype.splice;
obj[0] = "x";
obj[4294967295] = "y";
obj.length = 4294967296;
var arr = obj.splice(4294967295, 1);

//CHECK#1
if (arr.length !== 0) {
  $ERROR('#1: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[4294967295] = "y"; obj.length = 4294967296; var arr = obj.splice(4294967295,1); arr.length === 0. Actual: ' + (arr.length));
}

//CHECK#2
if (obj.length !== 0) {
   $ERROR('#2: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[4294967295] = "y"; obj.length = 4294967296; var arr = obj.splice(4294967295,1); obj.length === 0. Actual: ' + (obj.length));
}

//CHECK#3
if (obj[0] !== "x") {
   $ERROR('#3: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[4294967295] = "y"; obj.length = 4294967296; var arr = obj.splice(4294967295,1); obj[0] === "x". Actual: ' + (obj[0]));
}   

//CHECK#4
if (obj[4294967295] !== "y") {
   $ERROR('#4: var obj = {}; obj.splice = Array.prototype.splice; obj[0] = "x"; obj[4294967295] = "y"; obj.length = 4294967296; var arr = obj.splice(4294967295,1); obj[4294967295] === "y". Actual: ' + (obj[4294967295]));
}  

