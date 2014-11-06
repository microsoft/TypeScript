// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Result(3).type is not normal, then Result(3).type must be throw.
 * Throw Result(3).value as an exception
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A3.3_T4.js
 * @description Throw statement
 */

//CHECK#1
try {
  eval("throw 1;");
  $ERROR('#1.1: throw 1 must throw SyntaxError. Actual: ' + (eval("throw 1;")));
} catch(e) {
  if (e !== 1) {
    $ERROR('#1.2: throw 1 must throw SyntaxError. Actual: ' + (e));
  }  
}

