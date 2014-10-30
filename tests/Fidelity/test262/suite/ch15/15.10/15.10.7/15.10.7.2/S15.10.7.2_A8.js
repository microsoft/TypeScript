// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp instance global property has the attribute DontEnum
 *
 * @path ch15/15.10/15.10.7/15.10.7.2/S15.10.7.2_A8.js
 * @description Checking if enumerating the global property of RegExp instance fails
 */

__re = new RegExp("[o-o]","m");

//CHECK#0
if (__re.hasOwnProperty('global') !== true) {
  $FAIL('#0: __re = new RegExp("[o-o]","m"); __re.hasOwnProperty(\'global\') === true');
}

 //CHECK#1
if (__re.propertyIsEnumerable('global') !== false) {
  $ERROR('#1: __re = new RegExp("[o-o]","m"); __re.propertyIsEnumerable(\'global\') === false');
}

 //CHECK#2
count = 0
for (p in __re){
  if (p==="global") count++   
}

if (count !== 0) {
  $ERROR('#2: count = 0; __re = new RegExp("[o-o]","m"); for (p in __re){ if (p==="global") count++; } count === 0. Actual: ' + (count));
} 


