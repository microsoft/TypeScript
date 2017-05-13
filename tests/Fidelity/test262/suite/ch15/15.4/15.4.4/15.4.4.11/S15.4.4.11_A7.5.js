// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The sort property of Array has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A7.5.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (Array.propertyIsEnumerable('sort') !== false) {
  $ERROR('#1: Array.propertyIsEnumerable(\'sort\') === false. Actual: ' + (Array.propertyIsEnumerable('sort')));
}

//CHECK#2
var result = true;
for (var p in Array){
  if (p === "sort") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in Array) { if (p === "sort") result = false; }  result === true;');
}


