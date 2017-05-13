// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator "typeof" uses GetValue
 *
 * @path ch11/11.4/11.4.3/S11.4.3_A2_T2.js
 * @description If GetBase(x) is null, return "undefined"
 */

//CHECK#1
if (typeof x !== "undefined") {
  $ERROR('#1: typeof x === "undefined". Actual: ' + (typeof x));
}

