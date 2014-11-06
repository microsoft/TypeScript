// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator "typeof" uses GetValue
 *
 * @path ch11/11.4/11.4.3/S11.4.3_A2_T1.js
 * @description Either Type(x) is not Reference or GetBase(x) is not null
 */

//CHECK#1
if (typeof 0 !== "number") {
  $ERROR('#1: typeof 0 === "number". Actual: ' + (typeof 0));
}

//CHECK#2
var x = 0;
if (typeof x !== "number") {
  $ERROR('#2: typeof x === "number". Actual: ' + (typeof x));
}

//CHECK#3
var x = new Object();
if (typeof x !== "object") {
  $ERROR('#3: var x = new Object(); typeof x === "object". Actual: ' + (typeof x));
}

