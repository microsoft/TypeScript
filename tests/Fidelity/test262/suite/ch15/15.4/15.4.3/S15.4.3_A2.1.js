// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of Array has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.3/S15.4.3_A2.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: Array.propertyIsEnumerable(\'length\') === false. Actual: ' + (Array.propertyIsEnumerable('length')));
}

//CHECK#2
result = true;
for (p in Array){
  if (p === "length") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array.slice) { if (p === "length") result = false; }  result === true;');
}


