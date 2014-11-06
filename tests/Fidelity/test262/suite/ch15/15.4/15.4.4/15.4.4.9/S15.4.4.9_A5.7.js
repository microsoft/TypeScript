// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The shift property of Array can't be used as constructor
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A5.7.js
 * @description If property does not implement the internal [[Construct]] method, throw a TypeError exception
 */

//CHECK#1

try {
  new Array.prototype.shift();
  $ERROR('#1.1: new Array.prototype.shift() throw TypeError. Actual: ' + (new Array.prototype.shift()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new Array.prototype.shift() throw TypeError. Actual: ' + (e));
  }
}

