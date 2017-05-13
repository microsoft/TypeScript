// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x || y uses GetValue
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A2.1_T3.js
 * @description If ToBoolean(x) is false and GetBase(y) is null, throw ReferenceError
 */

//CHECK#1
try {
  false || y;
  $ERROR('#1.1: false || y throw ReferenceError. Actual: ' + (false || y));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: false || y throw ReferenceError. Actual: ' + (e));  
  }
}

