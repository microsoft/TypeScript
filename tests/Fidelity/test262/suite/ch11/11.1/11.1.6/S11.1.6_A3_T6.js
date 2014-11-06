// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "This" operator only evaluates Expression
 *
 * @path ch11/11.1/11.1.6/S11.1.6_A3_T6.js
 * @description Applying grouping operator to delete and typeof operators
 */

//CHECK#1
if (delete (x) !== true) {
  $ERROR('#1: delete (x) === true');
}

//CHECK#2
if (typeof (x) !== "undefined") {
  $ERROR('#2: typeof (x) === "undefined". Actual: ' + (typeof (x)));
}

