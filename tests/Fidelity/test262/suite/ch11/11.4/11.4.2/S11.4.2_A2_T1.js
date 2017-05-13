// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator "void" uses GetValue
 *
 * @path ch11/11.4/11.4.2/S11.4.2_A2_T1.js
 * @description Either Type(x) is not Reference or GetBase(x) is not null
 */

//CHECK#1
if (void 0 !== undefined) {
  $ERROR('#1: void 0 === undefined. Actual: ' + (void 0));
}

//CHECK#2
var x = 0;
if (void x !== undefined) {
  $ERROR('#2: var x = 0; void x === undefined. Actual: ' + (void x));
}

//CHECK#3
var x = new Object();
if (void x !== undefined) {
  $ERROR('#3: var x = new Object(); void x === undefined. Actual: ' + (void x));
}

