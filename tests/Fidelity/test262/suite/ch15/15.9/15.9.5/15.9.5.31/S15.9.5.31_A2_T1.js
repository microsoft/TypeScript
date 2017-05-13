// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "setUTCSeconds" is 2
 *
 * @path ch15/15.9/15.9.5/15.9.5.31/S15.9.5.31_A2_T1.js
 * @description The "length" property of the "setUTCSeconds" is 2
 */

if(Date.prototype.setUTCSeconds.hasOwnProperty("length") !== true){
  $ERROR('#1: The setUTCSeconds has a "length" property');
}

if(Date.prototype.setUTCSeconds.length !== 2){
  $ERROR('#2: The "length" property of the setUTCSeconds is 2');
}


