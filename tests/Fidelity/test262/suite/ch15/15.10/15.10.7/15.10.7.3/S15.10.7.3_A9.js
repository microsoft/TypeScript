// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp instance ignoreCase property has the attribute DontDelete
 *
 * @path ch15/15.10/15.10.7/15.10.7.3/S15.10.7.3_A9.js
 * @description Checking if deleting the ignoreCase property fails
 */

__re = new RegExp;

//CHECK#0
if (__re.hasOwnProperty('ignoreCase') !== true) {
  $FAIL('#0: __re = new RegExp; __re.hasOwnProperty(\'ignoreCase\') === true');
}

//CHECK#1
if ((delete __re.ignoreCase) !== false) {
  $ERROR('#1: __re = new RegExp; (delete __re.ignoreCase) === false');
}

//CHECK#2
if (__re.hasOwnProperty('ignoreCase') !== true) {
  $ERROR('#2: __re = new RegExp;delete __re.ignoreCase === true; __re.hasOwnProperty(\'ignoreCase\') === true');
}




