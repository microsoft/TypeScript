// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The isNaN property has the attribute DontEnum
 *
 * @path ch15/15.1/15.1.2/15.1.2.4/S15.1.2.4_A2.5.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (this.propertyIsEnumerable('isNaN') !== false) {
  $ERROR('#1: this.propertyIsEnumerable(\'isNaN\') === false. Actual: ' + (this.propertyIsEnumerable('isNaN')));
}

//CHECK#2
var result = true;
for (p in this){
  if (p === "isNaN") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in this) { if (p === "isNaN") result = false; }  result === true;');
}

