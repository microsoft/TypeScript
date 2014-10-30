// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object constructor has the property "prototype"
 *
 * @path ch15/15.2/15.2.3/S15.2.3_A1.js
 * @description Checking existence of the property "prototype"
 */

if(!Object.hasOwnProperty("prototype")){
  $ERROR('#1: The Object constructor has the property "prototype"');
}

