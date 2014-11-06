// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The slice property of Array can't be used as constructor
 *
 * @path ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A5.7.js
 * @description If property does not implement the internal [[Construct]] method, throw a TypeError exception
 */

//CHECK#1

try {
  new Array.prototype.slice();
  $ERROR('#1.1: new Array.prototype.slice() throw TypeError. Actual: ' + (new Array.prototype.slice()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new Array.prototype.slice() throw TypeError. Actual: ' + (e));
  }
}

