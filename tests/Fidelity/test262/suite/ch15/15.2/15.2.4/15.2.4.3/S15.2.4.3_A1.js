// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * toLocaleString function returns the result of calling toString()
 *
 * @path ch15/15.2/15.2.4/15.2.4.3/S15.2.4.3_A1.js
 * @description Checking the type of Object.prototype.toLocaleString and the returned result
 */

//CHECK#1
if (typeof Object.prototype.toLocaleString !== "function") {
  $ERROR('#1: toLocaleString method defined');
}

//CHECK#2
if (Object.prototype.toLocaleString() !== Object.prototype.toString()) {
  $ERROR('#1: toLocaleString function returns the result of calling toString()');
}

//CHECK#2
if ({}.toLocaleString()!=={}.toString()) {
  $ERROR('#2: toLocaleString function returns the result of calling toString()');
}

