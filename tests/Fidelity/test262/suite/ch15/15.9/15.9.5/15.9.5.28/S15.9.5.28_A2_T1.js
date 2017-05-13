// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "setMilliseconds" is 1
 *
 * @path ch15/15.9/15.9.5/15.9.5.28/S15.9.5.28_A2_T1.js
 * @description The "length" property of the "setMilliseconds" is 1
 */

if(Date.prototype.setMilliseconds.hasOwnProperty("length") !== true){
  $ERROR('#1: The setMilliseconds has a "length" property');
}

if(Date.prototype.setMilliseconds.length !== 1){
  $ERROR('#2: The "length" property of the setMilliseconds is 1');
}


