// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp instance multiline property has the attribute DontEnum
 *
 * @path ch15/15.10/15.10.7/15.10.7.4/S15.10.7.4_A8.js
 * @description Checking if enumerating the multiline property of RegExp instance fails
 */

__re = new RegExp("[\u0041-\u0049]");

//CHECK#0
if (__re.hasOwnProperty('multiline') !== true) {
  $FAIL('#0: __re = new RegExp("[\\u0041-\\u0049]"); __re.hasOwnProperty(\'multiline\') === true');
}

 //CHECK#1
if (__re.propertyIsEnumerable('multiline') !== false) {
  $ERROR('#1: __re = new RegExp("[\\u0041-\\u0049]"); __re.propertyIsEnumerable(\'multiline\') === false');
}

 //CHECK#2
count = 0
for (p in __re){
  if (p==="multiline") count++   
}

if (count !== 0) {
  $ERROR('#2: count = 0; __re = new RegExp("[\\u0041-\\u0049]"); for (p in __re){ if (p==="multiline") count++; } count === 0. Actual: ' + (count));
} 

