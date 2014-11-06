// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "getUTCMonth" is 0
 *
 * @path ch15/15.9/15.9.5/15.9.5.13/S15.9.5.13_A2_T1.js
 * @description The "length" property of the "getUTCMonth" is 0
 */

if(Date.prototype.getUTCMonth.hasOwnProperty("length") !== true){
  $ERROR('#1: The getUTCMonth has a "length" property');
}

if(Date.prototype.getUTCMonth.length !== 0){
  $ERROR('#2: The "length" property of the getUTCMonth is 0');
}


