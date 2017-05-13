// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If neither Result(2) nor any prefix of Result(2) satisfies the syntax of a
 * StrDecimalLiteral (see 9.3.1), return NaN
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A3_T3.js
 * @description parseFloat("wrong numbr format") return NaN
 */

//CHECK#1
if (isNaN(parseFloat(".x")) !== true) {
  $ERROR('#1: parseFloat(".x") === Not-a-Number. Actual: ' + (parseFloat(".x")));
}

//CHECK#2
if (isNaN(parseFloat("+x")) !== true) {
  $ERROR('#2: parseFloat("+x") === Not-a-Number. Actual: ' + (parseFloat("+x")));
}

//CHECK#3
if (isNaN(parseFloat("infinity")) !== true) {
  $ERROR('#3: parseFloat("infinity") === Not-a-Number. Actual: ' + (parseFloat("infinity")));
}

//CHECK#4
if (isNaN(parseFloat("A")) !== true) {
  $ERROR('#4: parseFloat("A") === Not-a-Number. Actual: ' + (parseFloat("A")));
}

//CHECK#5
if (String(parseFloat(".s")) !== "NaN") {
  $ERROR('#5: String(parseFloat(".s")) === "NaN". Actual: ' + (String(parseFloat(".s"))));
}

//CHECK#6
if (String(parseFloat("+x")) !== "NaN") {
  $ERROR('#6: String(parseFloat("+x")) === "NaN". Actual: ' + (String(parseFloat("+x"))));
}

//CHECK#7
if (String(parseFloat("infinity")) !== "NaN") {
  $ERROR('#73: String(parseFloat("infinity")) === "NaN". Actual: ' + (String(parseFloat("infinity"))));
}

//CHECK#8
if (String(parseFloat("A")) !== "NaN") {
  $ERROR('#8: String(parseFloat("A")) === "NaN". Actual: ' + (String(parseFloat("A"))));
}

