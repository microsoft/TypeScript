// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp instance ignoreCase property has the attribute DontEnum
 *
 * @path ch15/15.10/15.10.7/15.10.7.3/S15.10.7.3_A8.js
 * @description Checking if enumerating the ignoreCase property of RegExp instance fails
 */

__re = new RegExp("[|||||||]","");

//CHECK#0
if (__re.hasOwnProperty('ignoreCase') !== true) {
  $FAIL('#0: __re = new RegExp("[|||||||]",""); __re.hasOwnProperty(\'ignoreCase\') === true');
}

 //CHECK#1
if (__re.propertyIsEnumerable('ignoreCase') !== false) {
  $ERROR('#1: __re = new RegExp("[|||||||]",""); __re.propertyIsEnumerable(\'ignoreCase\') === false');
}

 //CHECK#2
count = 0
for (p in __re){
  if (p==="ignoreCase") count++   
}

if (count !== 0) {
  $ERROR('#2: count = 0; __re = new RegExp("[|||||||]",""); for (p in __re){ if (p==="ignoreCase") count++; } count === 0. Actual: ' + (count));
} 

