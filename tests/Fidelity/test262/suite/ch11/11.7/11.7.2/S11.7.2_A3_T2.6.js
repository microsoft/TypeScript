// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x >> y returns ToNumber(x) >> ToNumber(y)
 *
 * @path ch11/11.7/11.7.2/S11.7.2_A3_T2.6.js
 * @description Type(x) is different from Type(y) and both types vary between String (primitive or object) and Undefined
 */

//CHECK#1
if ("1" >> undefined !== 1) {
  $ERROR('#1: "1" >> undefined === 1. Actual: ' + ("1" >> undefined));
}

//CHECK#2
if (undefined >> "1" !== 0) {
  $ERROR('#2: undefined >> "1" === 0. Actual: ' + (undefined >> "1"));
}

//CHECK#3
if (new String("1") >> undefined !== 1) {
  $ERROR('#3: new String("1") >> undefined === 1. Actual: ' + (new String("1") >> undefined));
}

//CHECK#4
if (undefined >> new String("1") !== 0) {
  $ERROR('#4: undefined >> new String("1") === 0. Actual: ' + (undefined >> new String("1")));
}

