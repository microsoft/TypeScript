// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x / y returns ToNumber(x) / ToNumber(y)
 *
 * @path ch11/11.5/11.5.2/S11.5.2_A3_T2.1.js
 * @description Type(x) is different from Type(y) and both types vary between Number (primitive or object) and Boolean (primitive and object)
 */

//CHECK#1
if (true / 1 !== 1) {
  $ERROR('#1: true / 1 === 1. Actual: ' + (true / 1));
}

//CHECK#2
if (1 / true !== 1) {
  $ERROR('#2: 1 / true === 1. Actual: ' + (1 / true));
}

//CHECK#3
if (new Boolean(true) / 1 !== 1) {
  $ERROR('#3: new Boolean(true) / 1 === 1. Actual: ' + (new Boolean(true) / 1));
}

//CHECK#4
if (1 / new Boolean(true) !== 1) {
  $ERROR('#4: 1 / new Boolean(true) === 1. Actual: ' + (1 / new Boolean(true)));
}

//CHECK#5
if (true / new Number(1) !== 1) {
  $ERROR('#5: true / new Number(1) === 1. Actual: ' + (true / new Number(1)));
}

//CHECK#6
if (new Number(1) / true !== 1) {
  $ERROR('#6: new Number(1) / true === 1. Actual: ' + (new Number(1) / true));
}

//CHECK#7
if (new Boolean(true) / new Number(1) !== 1) {
  $ERROR('#7: new Boolean(true) / new Number(1) === 1. Actual: ' + (new Boolean(true) / new Number(1)));
}

//CHECK#8
if (new Number(1) / new Boolean(true) !== 1) {
  $ERROR('#8: new Number(1) / new Boolean(true) === 1. Actual: ' + (new Number(1) / new Boolean(true)));
}

