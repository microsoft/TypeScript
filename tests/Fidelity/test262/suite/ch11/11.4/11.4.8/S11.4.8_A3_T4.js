// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator ~x returns ~ToInt32(x)
 *
 * @path ch11/11.4/11.4.8/S11.4.8_A3_T4.js
 * @description Type(x) is undefined or null
 */

//CHECK#1
if (~void 0 !== -1) {
  $ERROR('#1: ~void 0 === -1. Actual: ' + (~void 0));
}

//CHECK#2
if (~null !== -1) {
  $ERROR('#2: ~null === -1. Actual: ' + (~null));
}

