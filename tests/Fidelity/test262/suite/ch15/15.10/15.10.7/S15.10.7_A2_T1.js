// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp instance has not [[construct]] property
 *
 * @path ch15/15.10/15.10.7/S15.10.7_A2_T1.js
 * @description Checking if creating new RegExp instance fails
 */

//CHECK#1
try {
  $ERROR('#1.1: new /z/() throw TypeError. Actual: ' + (new /z/()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new /z/() throw TypeError. Actual: ' + (e));
  }
}


