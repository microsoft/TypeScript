// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x ? y : z uses GetValue
 *
 * @path ch11/11.12/S11.12_A2.1_T2.js
 * @description If GetBase(x) is null, throw ReferenceError
 */

//CHECK#1
try {
  x ? true : false;
  $ERROR('#1.1: x ? true : false throw ReferenceError. Actual: ' + (x ? true : false));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: x ? true : false throw ReferenceError. Actual: ' + (e));  
  }
}

