// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * First expression is evaluated first, and then second expression
 *
 * @path ch11/11.8/11.8.7/S11.8.7_A2.4_T3.js
 * @description Checking with undeclarated variables
 */

//CHECK#1
try {
  max_value in (max_value = "MAX_VALUE", Number);
  $ERROR('#1.1: max_value in (max_value = "MAX_VALUE", Number) throw ReferenceError. Actual: ' + (max_value in (max_value = "MAX_VALUE", Number)));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: max_value in (max_value = "MAX_VALUE", Number) throw ReferenceError. Actual: ' + (e));  
  }
}

//CHECK#2
if ((NUMBER = Number, "MAX_VALUE") in NUMBER !== true) {
  $ERROR('#2: (NUMBER = Number, "MAX_VALUE") in NUMBER !== true');
}


