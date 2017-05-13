// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "getMinutes" is 0
 *
 * @path ch15/15.9/15.9.5/15.9.5.20/S15.9.5.20_A2_T1.js
 * @description The "length" property of the "getMinutes" is 0
 */

if(Date.prototype.getMinutes.hasOwnProperty("length") !== true){
  $ERROR('#1: The getMinutes has a "length" property');
}

if(Date.prototype.getMinutes.length !== 0){
  $ERROR('#2: The "length" property of the getMinutes is 0');
}


