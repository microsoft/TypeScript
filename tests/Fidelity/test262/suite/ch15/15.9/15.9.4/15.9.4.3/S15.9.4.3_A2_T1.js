// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "UTC" is 7
 *
 * @path ch15/15.9/15.9.4/15.9.4.3/S15.9.4.3_A2_T1.js
 * @description The "length" property of the "UTC" is 7
 */

if(Date.UTC.hasOwnProperty("length") !== true){
  $ERROR('#1: The UTC has a "length" property');
}

if(Date.UTC.length !== 7){
  $ERROR('#2: The "length" property of the UTC is 7');
}


