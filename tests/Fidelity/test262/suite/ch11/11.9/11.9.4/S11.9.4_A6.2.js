// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) and Type(y) are Null-s, return true
 *
 * @path ch11/11.9/11.9.4/S11.9.4_A6.2.js
 * @description null === null
 */

//CHECK#1
if (!(null === null)) {
  $ERROR('#1: null === null');
}

