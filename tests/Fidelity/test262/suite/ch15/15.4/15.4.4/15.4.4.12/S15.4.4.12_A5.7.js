// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The splice property of Array can't be used as constructor
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A5.7.js
 * @description If property does not implement the internal [[Construct]] method, throw a TypeError exception
 */

//CHECK#1

try {
  new Array.prototype.splice();
  $ERROR('#1.1: new Array.prototype.splice() throw TypeError. Actual: ' + (new Array.prototype.splice()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new Array.prototype.splice() throw TypeError. Actual: ' + (e));
  }
}

