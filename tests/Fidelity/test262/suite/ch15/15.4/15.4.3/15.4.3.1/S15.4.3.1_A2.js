// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Array.prototype property has the attribute DontEnum
 *
 * @path ch15/15.4/15.4.3/15.4.3.1/S15.4.3.1_A2.js
 * @description Checking if enumerating the Array.prototype property fails
 */

//CHECK#1
if (Array.propertyIsEnumerable('prototype') !== false) {
	$ERROR('#1: Array.propertyIsEnumerable(\'prototype\') === false. Actual: ' + (Array.propertyIsEnumerable('prototype')));
}

//CHECK#2
var result = true;
for (var p in Array){
	if (p === "prototype") {
	  result = false;
	}  
}

if (result !== true) {
	$ERROR('#2: result = true; for (p in Array) { if (p === "prototype") result = false; }  result === true;');
}


