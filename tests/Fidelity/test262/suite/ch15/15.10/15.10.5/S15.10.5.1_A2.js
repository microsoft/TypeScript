// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp.prototype property has the attribute DontEnum
 *
 * @path ch15/15.10/15.10.5/S15.10.5.1_A2.js
 * @description Checking if enumerating the RegExp.prototype property fails
 */

//CHECK#0
if (RegExp.hasOwnProperty('prototype') !== true) {
	$ERROR('#0: RegExp.hasOwnProperty(\'prototype\') === true');
}

 //CHECK#1
if (RegExp.propertyIsEnumerable('prototype') !== false) {
	$ERROR('#1: RegExp.propertyIsEnumerable(\'prototype\') === false');
}

 //CHECK#2
count=0;
for (p in RegExp){
	if (p==="prototype") count++;
}

if (count !== 0) {
	$ERROR('#2: count=0; for (p in RegExp){ if (p==="prototype") count++; } count === 0. Actual: ' + (count));
}


