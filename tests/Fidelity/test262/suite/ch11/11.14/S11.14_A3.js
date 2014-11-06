// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Comma Operator evaluates all Expressions and returns the last of them
 *
 * @path ch11/11.14/S11.14_A3.js
 * @description Checking with "="
 */

//CHECK#1
var x = 0;
var y = 0;
var z = 0;
if ((x = 1, y = 2, z = 3) !== 3) {
  $ERROR('#1: var x = 0; var y = 0; var z = 0; (x = 1, y = 2, z = 3) === 3. Actual: ' + ((x = 1, y = 2, z = 3)));
}

var x = 0;
var y = 0;
var z = 0;
x = 1, y = 2, z = 3;

//CHECK#2
if (x !== 1) {
  $ERROR('#2: var x = 0; var y = 0; var z = 0; x = 1, y = 2, z = 3; x === 1. Actual: ' + (x));
}

//CHECK#3
if (y !== 2) {
  $ERROR('#3: var x = 0; var y = 0; var z = 0; x = 1, y = 2, z = 3; y === 2. Actual: ' + (y));
}

//CHECK#4
if (z !== 3) {
  $ERROR('#4: var x = 0; var y = 0; var z = 0; x = 1, y = 2, z = 3; z === 3. Actual: ' + (z));
}

