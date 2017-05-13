// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Function.prototype.apply.length property has the attribute DontEnum
 *
 * @path ch15/15.3/15.3.4/15.3.4.3/S15.3.4.3_A11.js
 * @description TChecking if enumerating the Function.prototype.apply.length property fails
 */

//CHECK#0
if (!(Function.prototype.apply.hasOwnProperty('length'))) {
  $FAIL('#0: the Function.prototype.apply has length property.');
}


// CHECK#1
if (Function.prototype.apply.propertyIsEnumerable('length')) {
  $ERROR('#1: the Function.prototype.apply.length property has the attributes DontEnum');
}

// CHECK#2
for (var p in Function.prototype.apply){
  if (p==="length")
      $ERROR('#2: the Function.prototype.apply.length property has the attributes DontEnum');
}

