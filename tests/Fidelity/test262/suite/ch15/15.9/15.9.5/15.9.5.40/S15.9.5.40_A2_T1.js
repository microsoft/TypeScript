// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "setFullYear" is 3
 *
 * @path ch15/15.9/15.9.5/15.9.5.40/S15.9.5.40_A2_T1.js
 * @description The "length" property of the "setFullYear" is 3
 */

if(Date.prototype.setFullYear.hasOwnProperty("length") !== true){
  $ERROR('#1: The setFullYear has a "length" property');
}

if(Date.prototype.setFullYear.length !== 3){
  $ERROR('#2: The "length" property of the setFullYear is 3');
}


