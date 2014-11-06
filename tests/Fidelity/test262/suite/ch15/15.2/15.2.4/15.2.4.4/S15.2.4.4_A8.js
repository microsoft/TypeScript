// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object.prototype.valueOf.length property has the attribute DontEnum
 *
 * @path ch15/15.2/15.2.4/15.2.4.4/S15.2.4.4_A8.js
 * @description Checking if enumerating the Object.prototype.valueOf.length property fails
 */

//CHECK#0
if (!(Object.prototype.valueOf.hasOwnProperty('length'))) {
  $FAIL('#0: the Object.prototype.valueOf has length property.');
}


// CHECK#1
if (Object.prototype.valueOf.propertyIsEnumerable('length')) {
  $ERROR('#1: the Object.prototype.valueOf.length property has the attributes DontEnum');
}

// CHECK#2
for (p in Object.prototype.valueOf){
  if (p==="length")
        $ERROR('#2: the Object.prototype.valueOf.length property has the attributes DontEnum');
}
//

