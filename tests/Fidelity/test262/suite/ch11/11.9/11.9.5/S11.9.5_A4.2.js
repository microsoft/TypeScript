// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is +0(-0) and y is -0(+0), return false
 *
 * @path ch11/11.9/11.9.5/S11.9.5_A4.2.js
 * @description Checking all combinations
 */

//CHECK#1
if (+0 !== -0) {
  $ERROR('#1: +0 === -0');
}

//CHECK#2
if (-0 !== +0) {
  $ERROR('#2: -0 === +0');
}

