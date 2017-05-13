// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Number constructor has the property "MAX_VALUE"
 *
 * @path ch15/15.7/15.7.3/S15.7.3_A2.js
 * @description Checking existence of the property "MAX_VALUE"
 */

if(!Number.hasOwnProperty("MAX_VALUE")){
  $ERROR('#1: The Number constructor has the property "MAX_VALUE"');
}


