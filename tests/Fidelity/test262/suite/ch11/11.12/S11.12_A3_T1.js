// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is false, return z
 *
 * @path ch11/11.12/S11.12_A3_T1.js
 * @description Type(y) and Type(z) are boolean primitives
 */

//CHECK#1
if ((false ? false : true) !== true) {
  $ERROR('#1: (false ? false : true) === true');
}

//CHECK#2
var z = new Boolean(true);
if ((false ? true : z) !== z) {
  $ERROR('#2: (var y = new Boolean(true); (false ? true : z) === z');
}

