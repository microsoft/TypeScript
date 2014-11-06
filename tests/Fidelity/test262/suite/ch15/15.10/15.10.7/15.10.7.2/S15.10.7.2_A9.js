// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp instance global property has the attribute DontDelete
 *
 * @path ch15/15.10/15.10.7/15.10.7.2/S15.10.7.2_A9.js
 * @description Checking if deleting the global property fails
 */

__re = new RegExp;

//CHECK#0
if (__re.hasOwnProperty('global') !== true) {
  $FAIL('#0: __re = new RegExp; __re.hasOwnProperty(\'global\') === true');
}

//CHECK#1
if ((delete __re.global) !== false) {
  $ERROR('#1: __re = new RegExp; (delete __re.global) === false');
}

//CHECK#2
if (__re.hasOwnProperty('global') !== true) {
  $ERROR('#2: __re = new RegExp;delete __re.global === true; __re.hasOwnProperty(\'global\') === true');
}


