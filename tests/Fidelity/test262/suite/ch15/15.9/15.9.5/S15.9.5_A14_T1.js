// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype has the property "getDate"
 *
 * @path ch15/15.9/15.9.5/S15.9.5_A14_T1.js
 * @description The Date.prototype has the property "getDate"
 */

if(Date.prototype.hasOwnProperty("getDate") !== true){
  $ERROR('#1: The Date.prototype has the property "getDate"');
}


