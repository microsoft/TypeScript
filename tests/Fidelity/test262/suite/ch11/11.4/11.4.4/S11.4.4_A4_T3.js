// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator ++x returns ToNumber(x) + 1
 *
 * @path ch11/11.4/11.4.4/S11.4.4_A4_T3.js
 * @description Type(x) is string primitive or String object
 */

//CHECK#1
var x = "1";
if (++x !== 1 + 1) {
  $ERROR('#1: var x = "1"; ++x === 1 + 1. Actual: ' + (++x));
}

//CHECK#2
var x = "x"; 
if (isNaN(++x) !== true) {
  $ERROR('#2: var x = "x"; ++x === Not-a-Number. Actual: ' + (++x));
}

//CHECK#3
var x = new String("-1");
if (++x !== -1 + 1) {
  $ERROR('#3: var x = new String("-1"); ++x === -1 + 1. Actual: ' + (++x));
}

