// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "getUTCHours" is 0
 *
 * @path ch15/15.9/15.9.5/15.9.5.19/S15.9.5.19_A2_T1.js
 * @description The "length" property of the "getUTCHours" is 0
 */

if(Date.prototype.getUTCHours.hasOwnProperty("length") !== true){
  $ERROR('#1: The getUTCHours has a "length" property');
}

if(Date.prototype.getUTCHours.length !== 0){
  $ERROR('#2: The "length" property of the getUTCHours is 0');
}


