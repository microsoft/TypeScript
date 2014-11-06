// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of decodeURI has the attribute DontEnum
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A5.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (decodeURI.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: decodeURI.propertyIsEnumerable(\'length\') === false. Actual: ' + (decodeURI.propertyIsEnumerable('length')));
}

//CHECK#2
result = true;
for (p in decodeURI){
  if (p === "length") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in decodeURI) { if (p === "length") result = false; }  result === true;');
}

