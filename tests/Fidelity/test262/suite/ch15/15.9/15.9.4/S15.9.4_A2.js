// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date constructor has the property "parse"
 *
 * @path ch15/15.9/15.9.4/S15.9.4_A2.js
 * @description Checking existence of the property "parse"
 */

if(!Date.hasOwnProperty("parse")){
  $ERROR('#1: The Date constructor has the property "parse"');
}


