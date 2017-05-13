// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Result(3).type is normal and its completion value is empty,
 * then return the value undefined
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A3.2_T2.js
 * @description Var statement
 */

//CHECK#1
if (eval("var x = 1") !== undefined) {
  $ERROR('#1: eval("var x = 1") === undefined. Actual: ' + (eval("var x = 1")));
}    

