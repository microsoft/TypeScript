// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If pattern is an object R whose [[Class]] property is "RegExp" and flags is not undefined, then throw a TypeError exception
 *
 * @path ch15/15.10/15.10.4/S15.10.4.1_A2_T2.js
 * @description Checking if execution of "new RegExp(pattern, {})", where the pattern is "/1?1/mig", fails
 */

//CHECK#1
try {
  $ERROR('#1.1: new RegExp(/1?1/mig, {}) throw TypeError. Actual: ' + (new RegExp(/1?1/mig, {}))); 
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new RegExp(/1?1/mig, {}) throw TypeError. Actual: ' + (e));
  }
}


