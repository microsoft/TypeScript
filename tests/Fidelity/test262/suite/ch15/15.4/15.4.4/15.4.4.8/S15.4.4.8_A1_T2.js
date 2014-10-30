// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The elements of the array are rearranged so as to reverse their order.
 * The object is returned as the result of the call
 *
 * @path ch15/15.4/15.4.4/15.4.4.8/S15.4.4.8_A1_T2.js
 * @description Checking this algorithm, elements are objects and primitives
 */

//CHECK#1
var x = [];
x[0] = true;
x[2] = Infinity;
x[4] = undefined;
x[5] = undefined;
x[8] = "NaN";
x[9] = "-1";

var reverse = x.reverse();
if (reverse !== x) {
  $ERROR('#1: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse() === x. Actual: ' + (reverse));
}

//CHECK#2
if (x[0] !== "-1") {
   $ERROR('#2: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[0] === "-1". Actual: ' + (x[0]));
}

//CHECK#3
if (x[1] !== "NaN") {
   $ERROR('#3: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[1] === "NaN". Actual: ' + (x[1]));
}    

//CHECK#4
if (x[2] !== undefined) {
   $ERROR('#4: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[2] === undefined. Actual: ' + (x[2]));
}

//CHECK#5
if (x[3] !== undefined) {
   $ERROR('#5: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[3] === undefined. Actual: ' + (x[3]));
}    

//CHECK#6
if (x[4] !== undefined) {
   $ERROR('#6: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[4] === undefined. Actual: ' + (x[4]));
}

//CHECK#7
if (x[5] !== undefined) {
   $ERROR('#7: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[5] === undefined. Actual: ' + (x[5]));
}

//CHECK#8
if (x[6] !== undefined) {
   $ERROR('#8: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[6] === undefined. Actual: ' + (x[6]));
}      

//CHECK#9
if (x[7] !== Infinity) {
   $ERROR('#9: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[7] === Infinity. Actual: ' + (x[7]));
}

//CHECK#10
if (x[8] !== undefined) {
   $ERROR('#10: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[8] === undefined. Actual: ' + (x[8]));
}

//CHECK#11
if (x[9] !== true) {
   $ERROR('#11: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x[9] === true. Actual: ' + (x[9]));
}   

x.length = 9;

var reverse = x.reverse();
if (reverse !== x) {
  $ERROR('#1: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse() === x. Actual: ' + (reverse));
}

//CHECK#12
if (x[0] !== undefined) {
   $ERROR('#12: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[0] === undefined. Actual: ' + (x[0]));
}

//CHECK#13
if (x[1] !== Infinity) {
   $ERROR('#13: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[1] === Infinity. Actual: ' + (x[1]));
}    

//CHECK#14
if (x[2] !== undefined) {
   $ERROR('#14: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[2] === undefined. Actual: ' + (x[2]));
}

//CHECK#15
if (x[3] !== undefined) {
   $ERROR('#15: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[3] === undefined. Actual: ' + (x[3]));
}    

//CHECK#16
if (x[4] !== undefined) {
   $ERROR('#16: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[4] === undefined. Actual: ' + (x[4]));
}

//CHECK#17
if (x[5] !== undefined) {
   $ERROR('#17: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[5] === undefined. Actual: ' + (x[5]));
}

//CHECK#18
if (x[6] !== undefined) {
   $ERROR('#18: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[6] === undefined. Actual: ' + (x[6]));
}      

//CHECK#19
if (x[7] !== "NaN") {
   $ERROR('#19: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[7] === "NaN". Actual: ' + (x[7]));
}

//CHECK#20
if (x[8] !== "-1") {
   $ERROR('#20: x = []; x[0] = true; x[2] = Infinity; x[4] = undefined; x[5] = undefined; x[8] = "NaN"; x[9] = "-1"; x.reverse(); x.length = 9; x.reverse(); x[8] === "-1". Actual: ' + (x[8]));
}
    

