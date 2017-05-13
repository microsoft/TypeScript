// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The decodeURI property has the attribute DontEnum
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A5.5.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (this.propertyIsEnumerable('decodeURI') !== false) {
  $ERROR('#1: this.propertyIsEnumerable(\'decodeURI\') === false. Actual: ' + (this.propertyIsEnumerable('decodeURI')));
}

//CHECK#2
result = true;
for (p in this){
  if (p === "decodeURI") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in this) { if (p === "decodeURI") result = false; }  result === true;');
}

