// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is false, return y
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A3_T1.js
 * @description Type(x) and Type(y) vary between primitive boolean and Boolean object
 */

//CHECK#1
if ((false || true) !== true) {
  $ERROR('#1: (false || true) === true');
}

//CHECK#2
if ((false || false) !== false) {
  $ERROR('#2: (false || false) === false');
}

//CHECK#3
var y = new Boolean(true);
if ((false || y) !== y) {
  $ERROR('#3: (var y = new Boolean(true); false || y) === y');
}

//CHECK#4
var y = new Boolean(false);
if ((false || y) !== y) {
  $ERROR('#4: (var y = new Boolean(false); false || y) === y');
}

