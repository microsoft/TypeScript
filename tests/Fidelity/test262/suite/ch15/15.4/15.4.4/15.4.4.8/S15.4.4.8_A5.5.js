// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The reverse property of Array has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.4/15.4.4.8/S15.4.4.8_A5.5.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.propertyIsEnumerable('reverse') !== false) {
  $ERROR('#1: Array.propertyIsEnumerable(\'reverse\') === false. Actual: ' + (Array.propertyIsEnumerable('reverse')));
}

//CHECK#2
var result = true;
for (var p in Array){
  if (p === "reverse") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array) { if (p === "reverse") result = false; }  result === true;');
}


