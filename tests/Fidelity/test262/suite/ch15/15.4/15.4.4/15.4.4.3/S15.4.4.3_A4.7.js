// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The toLocaleString property of Array can't be used as constructor
 *
 * @path ch15/15.4/15.4.4/15.4.4.3/S15.4.4.3_A4.7.js
 * @description If property does not implement the internal [[Construct]] method, throw a TypeError exception
 */

//CHECK#1

try {
  new Array.prototype.toLocaleString();
  $ERROR('#1.1: new Array.prototype.toLocaleString() throw TypeError. Actual: ' + (new Array.prototype.toLocaleString()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new Array.prototype.toLocaleString() throw TypeError. Actual: ' + (e));
  }
}

