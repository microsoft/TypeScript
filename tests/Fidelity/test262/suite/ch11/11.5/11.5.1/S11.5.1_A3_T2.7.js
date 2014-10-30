// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x * y returns ToNumber(x) * ToNumber(y)
 *
 * @path ch11/11.5/11.5.1/S11.5.1_A3_T2.7.js
 * @description Type(x) is different from Type(y) and both types vary between String (primitive or object) and Null
 */

//CHECK#1
if ("1" * null !== 0) {
  $ERROR('#1: "1" * null === 0. Actual: ' + ("1" * null));
}

//CHECK#2
if (null * "1" !== 0) {
  $ERROR('#2: null * "1" === 0. Actual: ' + (null * "1"));
}

//CHECK#3
if (new String("1") * null !== 0) {
  $ERROR('#3: new String("1") * null === 0. Actual: ' + (new String("1") * null));
}

//CHECK#4
if (null * new String("1") !== 0) {
  $ERROR('#4: null * new String("1") === 0. Actual: ' + (null * new String("1")));
}

