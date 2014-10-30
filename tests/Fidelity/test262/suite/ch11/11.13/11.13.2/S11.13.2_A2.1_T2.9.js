// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator uses GetValue
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A2.1_T2.9.js
 * @description If GetBase(AssigmentExpression) is null, throw ReferenceError. Check operator is "x &= y"
 */

//CHECK#1
try {
  var x = 1;
  var z = (x &= y);
  $ERROR('#1.1: var x = 1; x &= y throw ReferenceError. Actual: ' + (z));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: var x = 1; x &= y throw ReferenceError. Actual: ' + (e));  
  }
}

