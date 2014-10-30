// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator ~x returns ~ToInt32(x)
 *
 * @path ch11/11.4/11.4.8/S11.4.8_A3_T1.js
 * @description Type(x) is boolean primitive or Boolean object
 */

//CHECK#1
if (~false !== -1) {
  $ERROR('#1: ~false === -1. Actual: ' + (~false));
}

//CHECK#2
if (~new Boolean(true) !== -2) {
  $ERROR('#2: ~new Boolean(true) === -2. Actual: ' + (~new Boolean(true)));
}

//CHECK#3
if (~new Boolean(false) !== -1) {
  $ERROR('#3: ~new Boolean(false) === -1. Actual: ' + (~new Boolean(false)));
}

