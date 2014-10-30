// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object.prototype.toString.length property has the attribute DontEnum
 *
 * @path ch15/15.2/15.2.4/15.2.4.2/S15.2.4.2_A8.js
 * @description Checking if enumerating the Object.prototype.toString.length property fails
 */

//CHECK#0
if (!(Object.prototype.toString.hasOwnProperty('length'))) {
  $FAIL('#0: the Object.prototype.toString has length property.');
}


// CHECK#1
if (Object.prototype.toString.propertyIsEnumerable('length')) {
  $ERROR('#1: the Object.prototype.toString.length property has the attributes DontEnum');
}

// CHECK#2
for (var p in Object.prototype.toString){
  if (p==="length")
        $ERROR('#2: the Object.prototype.toString.length property has the attributes DontEnum');
}
//

