// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The encodeURI property can't be used as constructor
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A5.7.js
 * @description If property does not implement the internal [[Construct]] method, throw a TypeError exception
 */

//CHECK#1

try {
  new encodeURI();
  $ERROR('#1.1: new encodeURI() throw TypeError. Actual: ' + (new encodeURI()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new encodeURI() throw TypeError. Actual: ' + (e));
  }
}

