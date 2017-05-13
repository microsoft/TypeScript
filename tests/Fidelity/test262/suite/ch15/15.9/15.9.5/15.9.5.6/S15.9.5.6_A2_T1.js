// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "toLocaleDateString" is 0
 *
 * @path ch15/15.9/15.9.5/15.9.5.6/S15.9.5.6_A2_T1.js
 * @description The "length" property of the "toLocaleDateString" is 0
 */

if(Date.prototype.toLocaleDateString.hasOwnProperty("length") !== true){
  $ERROR('#1: The toLocaleDateString has a "length" property');
}

if(Date.prototype.toLocaleDateString.length !== 0){
  $ERROR('#2: The "length" property of the toLocaleDateString is 0');
}


