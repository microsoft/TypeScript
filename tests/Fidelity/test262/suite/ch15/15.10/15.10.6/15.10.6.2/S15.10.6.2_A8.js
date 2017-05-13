// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp.prototype.exec.length property has the attribute DontEnum
 *
 * @path ch15/15.10/15.10.6/15.10.6.2/S15.10.6.2_A8.js
 * @description Checking if enumerating the RegExp.prototype.exec.length property fails
 */

//CHECK#0
if (RegExp.prototype.exec.hasOwnProperty('length') !== true) {
  $ERROR('#0: RegExp.prototype.exec.hasOwnProperty(\'length\') === true');
}

 //CHECK#1
if (RegExp.prototype.exec.propertyIsEnumerable('length') !== false) {
  $ERROR('#1: RegExp.prototype.exec.propertyIsEnumerable(\'length\') === true');
}

 //CHECK#2
count=0;

for (p in RegExp.prototype.exec){
  if (p==="length") count++;
}

if (count !== 0) {
  $ERROR('#2: count = 0; for (p in RegExp.prototype.exec){ if (p==="length") count++; } count === 0. Actual: ' + (count));
}


