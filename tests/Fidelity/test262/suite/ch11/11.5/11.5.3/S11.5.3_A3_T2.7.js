// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x % y returns ToNumber(x) % ToNumber(y)
 *
 * @path ch11/11.5/11.5.3/S11.5.3_A3_T2.7.js
 * @description Type(x) is different from Type(y) and both types vary between String (primitive or object) and Null
 */

//CHECK#1
if (isNaN("1" % null) !== true) {
  $ERROR('#1: "1" % null === Not-a-Number. Actual: ' + ("1" % null));
}

//CHECK#2
if (null % "1" !== 0) {
  $ERROR('#2: null % "1" === 0. Actual: ' + (null % "1"));
}

//CHECK#3
if (isNaN(new String("1") % null) !== true) {
  $ERROR('#3: new String("1") % null === Not-a-Number. Actual: ' + (new String("1") % null));
}

//CHECK#4
if (null % new String("1") !== 0) {
  $ERROR('#4: null % new String("1") === 0. Actual: ' + (null % new String("1")));
}

