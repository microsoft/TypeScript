// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Function prototype object is itself a Function object that, when invoked, accepts any arguments and returns undefined
 *
 * @path ch15/15.3/15.3.4/S15.3.4_A2_T1.js
 * @description Call Function.prototype()
 */

//CHECK#1
try {
  if (Function.prototype() !== undefined) {
    $ERROR('#1: The Function prototype object is itself a Function object that, when invoked, accepts any arguments and returns undefined');
  }
} catch (e) {
  $ERROR('#1.1: The Function prototype object is itself a Function object that, when invoked, accepts any arguments and returns undefined: '+e);
}

