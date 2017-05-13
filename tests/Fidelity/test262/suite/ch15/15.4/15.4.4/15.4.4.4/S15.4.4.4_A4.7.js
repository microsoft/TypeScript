// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The concat property of Array can't be used as constructor
 *
 * @path ch15/15.4/15.4.4/15.4.4.4/S15.4.4.4_A4.7.js
 * @description If property does not implement the internal [[Construct]] method, throw a TypeError exception
 */

//CHECK#1

try {
  new Array.prototype.concat();
  $ERROR('#1.1: new Array.prototype.concat() throw TypeError. Actual: ' + (new Array.prototype.concat()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new Array.prototype.concat() throw TypeError. Actual: ' + (e));
  }
}

