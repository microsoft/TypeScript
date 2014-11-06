// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "setDate" is 1
 *
 * @path ch15/15.9/15.9.5/15.9.5.36/S15.9.5.36_A2_T1.js
 * @description The "length" property of the "setDate" is 1
 */

if(Date.prototype.setDate.hasOwnProperty("length") !== true){
  $ERROR('#1: The setDate has a "length" property');
}

if(Date.prototype.setDate.length !== 1){
  $ERROR('#2: The "length" property of the setDate is 1');
}


