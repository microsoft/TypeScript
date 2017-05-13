// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "getUTCDay" is 0
 *
 * @path ch15/15.9/15.9.5/15.9.5.17/S15.9.5.17_A2_T1.js
 * @description The "length" property of the "getUTCDay" is 0
 */

if(Date.prototype.getUTCDay.hasOwnProperty("length") !== true){
  $ERROR('#1: The getUTCDay has a "length" property');
}

if(Date.prototype.getUTCDay.length !== 0){
  $ERROR('#2: The "length" property of the getUTCDay is 0');
}


