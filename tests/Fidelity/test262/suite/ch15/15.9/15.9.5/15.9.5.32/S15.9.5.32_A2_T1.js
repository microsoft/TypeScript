// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "setMinutes" is 3
 *
 * @path ch15/15.9/15.9.5/15.9.5.32/S15.9.5.32_A2_T1.js
 * @description The "length" property of the "setMinutes" is 3
 */

if(Date.prototype.setMinutes.hasOwnProperty("length") !== true){
  $ERROR('#1: The setMinutes has a "length" property');
}

if(Date.prototype.setMinutes.length !== 3){
  $ERROR('#2: The "length" property of the setMinutes is 3');
}


