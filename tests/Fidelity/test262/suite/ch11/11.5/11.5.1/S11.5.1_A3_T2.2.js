// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x * y returns ToNumber(x) * ToNumber(y)
 *
 * @path ch11/11.5/11.5.1/S11.5.1_A3_T2.2.js
 * @description Type(x) is different from Type(y) and both types vary between Number (primitive or object) and String (primitive and object)
 */

//CHECK#1
if ("1" * 1 !== 1) {
  $ERROR('#1: "1" * 1 === 1. Actual: ' + ("1" * 1));
}

//CHECK#2
if (1 * "1" !== 1) {
  $ERROR('#2: 1 * "1" === 1. Actual: ' + (1 * "1"));
}

//CHECK#3
if (new String("1") * 1 !== 1) {
  $ERROR('#3: new String("1") * 1 === 1. Actual: ' + (new String("1") * 1));
}

//CHECK#4
if (1 * new String("1") !== 1) {
  $ERROR('#4: 1 * new String("1") === 1. Actual: ' + (1 * new String("1")));
}

//CHECK#5
if ("1" * new Number(1) !== 1) {
  $ERROR('#5: "1" * new Number(1) === 1. Actual: ' + ("1" * new Number(1)));
}

//CHECK#6
if (new Number(1) * "1" !== 1) {
  $ERROR('#6: new Number(1) * "1" === 1. Actual: ' + (new Number(1) * "1"));
}

//CHECK#7
if (new String("1") * new Number(1) !== 1) {
  $ERROR('#7: new String("1") * new Number(1) === 1. Actual: ' + (new String("1") * new Number(1)));
}

//CHECK#8
if (new Number(1) * new String("1") !== 1) {
  $ERROR('#8: new Number(1) * new String("1") === 1. Actual: ' + (new Number(1) * new String("1")));
}

//CHECK#9
if (isNaN("x" * 1) !== true) {
  $ERROR('#9: "x" * 1 === Not-a-Number. Actual: ' + ("x" * 1));
}

//CHECK#10
if (isNaN(1 * "x") !== true) {
  $ERROR('#10: 1 * "x" === Not-a-Number. Actual: ' + (1 * "x"));
}

