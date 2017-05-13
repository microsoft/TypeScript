// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of slice has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A5.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.prototype.slice.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: Array.prototype.slice.propertyIsEnumerable(\'length\') === false. Actual: ' + (Array.prototype.slice.propertyIsEnumerable('length')));
}

//CHECK#2
var result = true;
for (var p in Array.slice){
  if (p === "length") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array.slice) { if (p === "length") result = false; }  result === true;');
}


