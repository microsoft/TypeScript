// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * This description of Array constructor applies if and only if
 * the Array constructor is given no arguments or at least two arguments
 *
 * @path ch15/15.4/15.4.1/S15.4.1_A1.3_T1.js
 * @description Checking case when Array constructor is given one argument
 */

var x = Array(2);

//CHECK#1
if (x.length === 1) {
  $ERROR('#1: var x = Array(2); x.length !== 1');
}

//CHECK#2
if (x[0] === 2) {
  $ERROR('#2: var x = Array(2); x[0] !== 2');
}

