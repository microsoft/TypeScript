// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x ^ y returns ToNumber(x) ^ ToNumber(y)
 *
 * @path ch11/11.10/11.10.2/S11.10.2_A3_T2.9.js
 * @description Type(x) is different from Type(y) and both types vary between Boolean (primitive or object) and Null
 */

//CHECK#1
if ((true ^ null) !== 1) {
  $ERROR('#1: (true ^ null) === 1. Actual: ' + ((true ^ null)));
}

//CHECK#2
if ((null ^ true) !== 1) {
  $ERROR('#2: (null ^ true) === 1. Actual: ' + ((null ^ true)));
}

//CHECK#3
if ((new Boolean(true) ^ null) !== 1) {
  $ERROR('#3: (new Boolean(true) ^ null) === 1. Actual: ' + ((new Boolean(true) ^ null)));
}

//CHECK#4
if ((null ^ new Boolean(true)) !== 1) {
  $ERROR('#4: (null ^ new Boolean(true)) === 1. Actual: ' + ((null ^ new Boolean(true))));
}

