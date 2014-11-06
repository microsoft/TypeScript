// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "constructor" is 7
 *
 * @path ch15/15.9/15.9.5/15.9.5.1/S15.9.5.1_A2_T1.js
 * @description The "length" property of the "constructor" is 7
 */

if(Date.prototype.constructor.hasOwnProperty("length") !== true){
  $ERROR('#1: The constructor has a "length" property');
}

if(Date.prototype.constructor.length !== 7){
  $ERROR('#2: The "length" property of the constructor is 7');
}


