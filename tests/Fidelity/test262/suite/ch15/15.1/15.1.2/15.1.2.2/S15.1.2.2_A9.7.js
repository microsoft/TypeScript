// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The parseInt property can't be used as constructor
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A9.7.js
 * @description If property does not implement the internal [[Construct]] method, throw a TypeError exception
 */

//CHECK#1

try {
  new parseInt();
  $ERROR('#1.1: new parseInt() throw TypeError. Actual: ' + (new parseInt()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new parseInt() throw TypeError. Actual: ' + (e));
  }
}

