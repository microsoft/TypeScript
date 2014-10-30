// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator "void" evaluates UnaryExpression and returns undefined
 *
 * @path ch11/11.4/11.4.2/S11.4.2_A4_T1.js
 * @description Type(x) is boolean primitive or Boolean object
 */

//CHECK#1
var x = false; 
if (void x !== undefined) {
  $ERROR('#1: var x = false; void x === undefined. Actual: ' + (void x));
}

//CHECK#2
var x = new Boolean(true);
if (void x !== undefined) {
  $ERROR('#2: var x = new Boolean(true); void x === undefined. Actual: ' + (void x));
}

