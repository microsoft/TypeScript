// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The toString property of Array has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.4/15.4.4.2/S15.4.4.2_A4.5.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.propertyIsEnumerable('toString') !== false) {
  $ERROR('#1: Array.propertyIsEnumerable(\'toString\') === false. Actual: ' + (Array.propertyIsEnumerable('toString')));
}

//CHECK#2
var result = true;
for (var p in Array){
  if (p === "toString") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array) { if (p === "toString") result = false; }  result === true;');
}


