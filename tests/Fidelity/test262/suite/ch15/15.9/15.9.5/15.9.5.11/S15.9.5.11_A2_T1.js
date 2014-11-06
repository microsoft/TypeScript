// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "getUTCFullYear" is 0
 *
 * @path ch15/15.9/15.9.5/15.9.5.11/S15.9.5.11_A2_T1.js
 * @description The "length" property of the "getUTCFullYear" is 0
 */

if(Date.prototype.getUTCFullYear.hasOwnProperty("length") !== true){
  $ERROR('#1: The getUTCFullYear has a "length" property');
}

if(Date.prototype.getUTCFullYear.length !== 0){
  $ERROR('#2: The "length" property of the getUTCFullYear is 0');
}


