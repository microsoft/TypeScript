// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of parseFloat has the attribute DontEnum
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A7.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (parseFloat.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: parseFloat.propertyIsEnumerable(\'length\') === false. Actual: ' + (parseFloat.propertyIsEnumerable('length')));
}

//CHECK#2
var result = true;
for (var p in parseFloat){
  if (p === "length") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in parseFloat) { if (p === "length") result = false; }  result === true;');
}

