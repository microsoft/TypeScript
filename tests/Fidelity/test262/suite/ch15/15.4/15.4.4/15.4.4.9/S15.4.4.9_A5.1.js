// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of shift has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A5.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.prototype.shift.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: Array.prototype.shift.propertyIsEnumerable(\'length\') === false. Actual: ' + (Array.prototype.shift.propertyIsEnumerable('length')));
}

//CHECK#2
var result = true;
for (var p in Array.shift){
  if (p === "length") {
    result = false;
}  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array.shift) { if (p === "length") result = false; }  result === true;');
}


