// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of decodeURIComponent has the attribute DontEnum
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A5.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (decodeURIComponent.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: decodeURIComponent.propertyIsEnumerable(\'length\') === false. Actual: ' + (decodeURIComponent.propertyIsEnumerable('length')));
}

//CHECK#2
result = true;
for (p in decodeURIComponent){
  if (p === "length") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in decodeURIComponent) { if (p === "length") result = false; }  result === true;');
}

