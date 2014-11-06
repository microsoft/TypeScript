// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "setHours" is 4
 *
 * @path ch15/15.9/15.9.5/15.9.5.34/S15.9.5.34_A2_T1.js
 * @description The "length" property of the "setHours" is 4
 */

if(Date.prototype.setHours.hasOwnProperty("length") !== true){
  $ERROR('#1: The setHours has a "length" property');
}

if(Date.prototype.setHours.length !== 4){
  $ERROR('#2: The "length" property of the setHours is 4');
}


