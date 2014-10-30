// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The reverse function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.8/S15.4.4.8_A2_T1.js
 * @description Checking this for Object object, elements are objects and primitives, length is integer
 */

//CHECK#1
var obj = {};
obj.length = 10;
obj.reverse = Array.prototype.reverse;

obj[0] = true;
obj[2] = Infinity;
obj[4] = undefined;
obj[5] = undefined;
obj[8] = "NaN";
obj[9] = "-1";

var reverse = obj.reverse();
if (reverse !== obj) {
  $ERROR('#1: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse() === obj. Actual: ' + (reverse));
}

//CHECK#2
if (obj[0] !== "-1") {
   $ERROR('#2: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[0] === "-1". Actual: ' + (obj[0]));
}

//CHECK#3
if (obj[1] !== "NaN") {
   $ERROR('#3: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[1] === "NaN". Actual: ' + (obj[1]));
}    

//CHECK#4
if (obj[2] !== undefined) {
   $ERROR('#4: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[2] === undefined. Actual: ' + (obj[2]));
}

//CHECK#5
if (obj[3] !== undefined) {
   $ERROR('#5: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[3] === undefined. Actual: ' + (obj[3]));
}    

//CHECK#6
if (obj[4] !== undefined) {
   $ERROR('#6: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[4] === undefined. Actual: ' + (obj[4]));
}

//CHECK#7
if (obj[5] !== undefined) {
   $ERROR('#7: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[5] === undefined. Actual: ' + (obj[5]));
}

//CHECK#8
if (obj[6] !== undefined) {
   $ERROR('#8: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[6] === undefined. Actual: ' + (obj[6]));
}      

//CHECK#9
if (obj[7] !== Infinity) {
   $ERROR('#9: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[7] === Infinity. Actual: ' + (obj[7]));
}

//CHECK#10
if (obj[8] !== undefined) {
   $ERROR('#10: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[8] === undefined. Actual: ' + (obj[8]));
}

//CHECK#11
if (obj[9] !== true) {
   $ERROR('#11: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj[9] === true. Actual: ' + (obj[9]));
}   

obj.length = 9;

var reverse = obj.reverse();
if (reverse !== obj) {
  $ERROR('#1: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse() === obj. Actual: ' + (reverse));
}

//CHECK#12
if (obj[0] !== undefined) {
   $ERROR('#12: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[0] === undefined. Actual: ' + (obj[0]));
}

//CHECK#13
if (obj[1] !== Infinity) {
   $ERROR('#13: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[1] === Infinity. Actual: ' + (obj[1]));
}    

//CHECK#14
if (obj[2] !== undefined) {
   $ERROR('#14: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[2] === undefined. Actual: ' + (obj[2]));
}

//CHECK#15
if (obj[3] !== undefined) {
   $ERROR('#15: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[3] === undefined. Actual: ' + (obj[3]));
}    

//CHECK#16
if (obj[4] !== undefined) {
   $ERROR('#16: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[4] === undefined. Actual: ' + (obj[4]));
}

//CHECK#17
if (obj[5] !== undefined) {
   $ERROR('#17: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[5] === undefined. Actual: ' + (obj[5]));
}

//CHECK#18
if (obj[6] !== undefined) {
   $ERROR('#18: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[6] === undefined. Actual: ' + (obj[6]));
}      

//CHECK#19
if (obj[7] !== "NaN") {
   $ERROR('#19: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[7] === "NaN". Actual: ' + (obj[7]));
}

//CHECK#20
if (obj[8] !== "-1") {
   $ERROR('#20: var obj = {}; obj.reverse = Array.prototype.reverse; obj.length = 10; obj[0] = true; obj[2] = Infinity; obj[4] = undefined; obj[5] = undefined; obj[8] = "NaN"; obj[9] = "-1"; obj.reverse(); obj.length = 9; obj.reverse(); obj[8] === "-1". Actual: ' + (obj[8]));
}

