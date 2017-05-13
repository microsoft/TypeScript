// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator --x uses GetValue and PutValue
 *
 * @path ch11/11.4/11.4.5/S11.4.5_A2.1_T3.js
 * @description If Type(x) is not Reference, throw ReferenceError (or SyntaxError)
 * @negative
 */

//CHECK#1
try {
  --1;
  $ERROR('#1.1: --1 throw ReferenceError (or SyntaxError). Actual: ' + (--1));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: --1 throw ReferenceError (or SyntaxError). Actual: ' + (e));  
  } else {
    --1;
  }
}

