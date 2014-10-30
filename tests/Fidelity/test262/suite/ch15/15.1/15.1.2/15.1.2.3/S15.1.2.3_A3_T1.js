// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If neither Result(2) nor any prefix of Result(2) satisfies the syntax of a
 * StrDecimalLiteral (see 9.3.1), return NaN
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A3_T1.js
 * @description parseFloat("some string") return NaN
 */

//CHECK#1
if (isNaN(parseFloat("str")) !== true) {
  $ERROR('#1: parseFloat("str") === Not-a-Number. Actual: ' + (parseFloat("str")));
}

//CHECK#2
if (isNaN(parseFloat("s1")) !== true) {
  $ERROR('#2: parseFloat("s1") === Not-a-Number. Actual: ' + (parseFloat("s1")));
}

//CHECK#3
if (isNaN(parseFloat("")) !== true) {
  $ERROR('#3: parseFloat("") === Not-a-Number. Actual: ' + (parseFloat("")));
}

//CHECK#4
if (String(parseFloat("str")) !== "NaN") {
  $ERROR('#4: String(parseFloat("str")) === "NaN". Actual: ' + (String(parseFloat("str"))));
}

//CHECK#5
if (String(parseFloat("s1")) !== "NaN") {
  $ERROR('#5: String(parseFloat("s1")) === "NaN". Actual: ' + (String(parseFloat("s1"))));
}

//CHECK#6
if (String(parseFloat("")) !== "NaN") {
  $ERROR('#6: String(parseFloat("")) === "NaN". Actual: ' + (String(parseFloat(""))));
}

//CHECK#7
if (String(parseFloat("+")) !== "NaN") {
  $ERROR('#7: String(parseFloat("+")) === "NaN". Actual: ' + (String(parseFloat("+"))));
}

