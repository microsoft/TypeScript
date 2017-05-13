// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString from separator
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A3.1_T1.js
 * @description Checking separator in ["", "\\", "&", true, Infinity, null, undefind, NaN]
 */

//CHECK#0
var x = new Array(0,1,2,3);
if (x.join("") !== "0123") {
  $ERROR('#0: x = new Array(0,1,2,3); x.join("") === "0123". Actual: ' + (x.join("")));
}

//CHECK#1
x = new Array(0,1,2,3);
if (x.join("\\") !== "0\\1\\2\\3") {
  $ERROR('#1: x = new Array(0,1,2,3); x.join("\\") === "0\\1\\2\\3". Actual: ' + (x.join("\\")));
}

//CHECK#2
if (x.join("&") !== "0&1&2&3") {
  $ERROR('#2: x = new Array(0,1,2,3); x.join("&") === "0&1&2&3". Actual: ' + (x.join("&")));
}

//CHECK#3
if (x.join(true) !== "0true1true2true3") {
  $ERROR('#3: x = new Array(0,1,2,3); x.join(true) === "0true1true2true3". Actual: ' + (x.join(true)));
}

//CHECK#4
if (x.join(Infinity) !== "0Infinity1Infinity2Infinity3") {
  $ERROR('#4: x = new Array(0,1,2,3); x.join(Infinity) === "0Infinity1Infinity2Infinity3". Actual: ' + (x.join(Infinity)));
}

//CHECK#5
if (x.join(null) !== "0null1null2null3") {
  $ERROR('#3: 5 = new Array(0,1,2,3); x.join(null) === "0null1null2null3". Actual: ' + (x.join(null)));
}

//CHECK#6
if (x.join(undefined) !== "0,1,2,3") {
  $ERROR('#6: x = new Array(0,1,2,3); x.join(undefined) === "0,1,2,3". Actual: ' + (x.join(undefined)));
}

//CHECK#7
if (x.join(NaN) !== "0NaN1NaN2NaN3") {
  $ERROR('#7: x = new Array(0,1,2,3); x.join("NaN") === "0NaN1NaN2NaN3". Actual: ' + (x.join("NaN")));
}

