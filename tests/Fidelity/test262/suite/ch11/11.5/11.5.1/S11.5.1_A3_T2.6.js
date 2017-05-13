// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x * y returns ToNumber(x) * ToNumber(y)
 *
 * @path ch11/11.5/11.5.1/S11.5.1_A3_T2.6.js
 * @description Type(x) is different from Type(y) and both types vary between primitive String (primitive or object) and Undefined
 */

//CHECK#1
if (isNaN("1" * undefined) !== true) {
  $ERROR('#1: "1" * undefined === Not-a-Number. Actual: ' + ("1" * undefined));
}

//CHECK#2
if (isNaN(undefined * "1") !== true) {
  $ERROR('#2: undefined * "1" === Not-a-Number. Actual: ' + (undefined * "1"));
}

//CHECK#3
if (isNaN(new String("1") * undefined) !== true) {
  $ERROR('#3: new String("1") * undefined === Not-a-Number. Actual: ' + (new String("1") * undefined));
}

//CHECK#4
if (isNaN(undefined * new String("1")) !== true) {
  $ERROR('#4: undefined * new String("1") === Not-a-Number. Actual: ' + (undefined * new String("1")));
}

