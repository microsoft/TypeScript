// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of join has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A6.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.prototype.join.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: Array.prototype.join.propertyIsEnumerable(\'length\') === false. Actual: ' + (Array.prototype.join.propertyIsEnumerable('length')));
}

//CHECK#2
var result = true;
for (var p in Array.join){
  if (p === "length") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array.join) { if (p === "length") result = false; }  result === true;');
}


