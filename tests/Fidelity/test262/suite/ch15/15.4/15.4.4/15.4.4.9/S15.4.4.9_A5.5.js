// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The shift property of Array has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A5.5.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.propertyIsEnumerable('shift') !== false) {
  $ERROR('#1: Array.propertyIsEnumerable(\'shift\') === false. Actual: ' + (Array.propertyIsEnumerable('shift')));
}

//CHECK#2
var result = true;
for (var p in Array){
  if (p === "shift") {
    result = false;
}  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array) { if (p === "shift") result = false; }  result === true;');
}


