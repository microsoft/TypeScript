// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp.prototype.toString.length property has the attribute DontEnum
 *
 * @path ch15/15.10/15.10.6/15.10.6.4/S15.10.6.4_A8.js
 * @description Checking if enumerating the RegExp.prototype.toString.length property fails
 */

//CHECK#0
if (RegExp.prototype.toString.hasOwnProperty('length') !== true) {
	$ERROR('#0: RegExp.prototype.toString.hasOwnProperty(\'length\') === true');
}

 //CHECK#1
if (RegExp.prototype.toString.propertyIsEnumerable('length') !== false) {
	$ERROR('#1: RegExp.prototype.toString.propertyIsEnumerable(\'length\') === true');
}

 //CHECK#2
count=0;

for (p in RegExp.prototype.toString){
	if (p==="length") count++;
}

if (count !== 0) {
	$ERROR('#2: count = 0; for (p in RegExp.prototype.toString){ if (p==="length") count++; } count === 0. Actual: ' + (count));
}


