// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * First expression is evaluated first, and then second expression
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A2.4_T3.js
 * @description Checking with undeclarated variables
 */

//CHECK#1
try {
  object instanceof (object = {}, Object);
  $ERROR('#1.1: object instanceof (object = {}, Object) throw ReferenceError. Actual: ' + (object instanceof (object = {}, Object)));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: object instanceof (object = {}, Object) throw ReferenceError. Actual: ' + (e));  
  }
}

//CHECK#2
if ((OBJECT = Object, {}) instanceof OBJECT !== true) {
  $ERROR('#2: (OBJECT = Object, {}) instanceof OBJECT !== true');
}


