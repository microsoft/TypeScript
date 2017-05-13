// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "setUTCMinutes" is 3
 *
 * @path ch15/15.9/15.9.5/15.9.5.33/S15.9.5.33_A2_T1.js
 * @description The "length" property of the "setUTCMinutes" is 3
 */

if(Date.prototype.setUTCMinutes.hasOwnProperty("length") !== true){
  $ERROR('#1: The setUTCMinutes has a "length" property');
}

if(Date.prototype.setUTCMinutes.length !== 3){
  $ERROR('#2: The "length" property of the setUTCMinutes is 3');
}


