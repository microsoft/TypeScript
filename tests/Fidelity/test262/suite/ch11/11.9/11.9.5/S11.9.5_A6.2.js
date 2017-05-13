// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) and Type(y) are Null-s, return false
 *
 * @path ch11/11.9/11.9.5/S11.9.5_A6.2.js
 * @description null === null
 */

//CHECK#1
if (null !== null) {
  $ERROR('#1: null === null');
}

