// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Date constructor has length property whose value is 7
 *
 * @path ch15/15.9/15.9.4/S15.9.4_A5.js
 * @description Checking Date.length property
 */

//CHECK#1
if (!Date.hasOwnProperty("length")){
  $ERROR('#1: Date constructor has length property');
}

//CHECK#2
if (Date.length !== 7) {
  $ERROR('#2: Date constructor length property value should be 7');
}

