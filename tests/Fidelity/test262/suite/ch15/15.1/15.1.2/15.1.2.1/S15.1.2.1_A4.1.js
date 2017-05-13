// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of eval has the attribute DontEnum
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A4.1.js
 * @description Checking use propertyIsEnumerable, for-in
 */

//CHECK#1
if (eval.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: eval.propertyIsEnumerable(\'length\') === false. Actual: ' + (eval.propertyIsEnumerable('length')));
}

//CHECK#2
var result = true;
for (p in eval){
  if (p === "length") {
    result = false;
  }  
}

if (result !== true) {
  $ERROR('#2: result = true; for (p in eval) { if (p === "length") result = false; };  result === true;');
}

