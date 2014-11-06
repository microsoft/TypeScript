// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "length" property of the "parse" is 1
 *
 * @path ch15/15.9/15.9.4/15.9.4.2/S15.9.4.2_A2_T1.js
 * @description The "length" property of the "parse" is 1
 */

if(Date.parse.hasOwnProperty("length") !== true){
  $ERROR('#1: The parse has a "length" property');
}

if(Date.parse.length !== 1){
  $ERROR('#2: The "length" property of the parse is 1');
}


