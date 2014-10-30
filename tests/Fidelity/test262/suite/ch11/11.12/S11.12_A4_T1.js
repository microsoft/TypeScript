// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is true, return y
 *
 * @path ch11/11.12/S11.12_A4_T1.js
 * @description Type(y) and Type(z) are boolean primitives
 */

//CHECK#1
if ((true ? false : true) !== false) {
  $ERROR('#1: (true ? false : true) === false');
}

//CHECK#2
var y = new Boolean(true);
if ((true ? y : false) !== y) {
  $ERROR('#2: (var y = new Boolean(true); (true ? y : false) === y');
}

//CHECK#3
var y = new Boolean(false);
if ((y ? y : true) !== y) {
  $ERROR('#3: (var y = new Boolean(false); (y ? y : true) === y');
}

