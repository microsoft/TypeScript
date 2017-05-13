// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * First expression is evaluated first, and then second expression
 *
 * @path ch11/11.9/11.9.5/S11.9.5_A2.4_T3.js
 * @description Checking undeclarated variables
 */

//CHECK#1
try {
  x !== (x = 1);
  $ERROR('#1.1: x !== (x = 1) throw ReferenceError. Actual: ' + (x !== (x = 1)));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: x !== (x = 1) throw ReferenceError. Actual: ' + (e));  
  }
}

//CHECK#2
if ((y = 1) !== y) {
  $ERROR('#2: (y = 1) === y');
}


