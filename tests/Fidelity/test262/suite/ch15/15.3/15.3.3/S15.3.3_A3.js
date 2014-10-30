// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function constructor has length property whose value is 1
 *
 * @path ch15/15.3/15.3.3/S15.3.3_A3.js
 * @description Checking Function.length property
 */

//CHECK#1
if (!Function.hasOwnProperty("length")){
  $ERROR('#1: Function constructor has length property');
}

//CHECK#2
if (Function.length !== 1) {
  $ERROR('#2: Function constructor length property value is 1');
}

