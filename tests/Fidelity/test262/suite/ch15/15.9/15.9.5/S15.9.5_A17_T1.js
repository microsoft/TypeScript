// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype has the property "getUTCDay"
 *
 * @path ch15/15.9/15.9.5/S15.9.5_A17_T1.js
 * @description The Date.prototype has the property "getUTCDay"
 */

if(Date.prototype.hasOwnProperty("getUTCDay") !== true){
  $ERROR('#1: The Date.prototype has the property "getUTCDay"');
}


