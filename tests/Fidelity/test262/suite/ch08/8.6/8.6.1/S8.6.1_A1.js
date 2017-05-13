// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A property can have attribute ReadOnly like E in Math
 *
 * @path ch08/8.6/8.6.1/S8.6.1_A1.js
 * @description Try change Math.E property
 * @noStrict
 */

var __e = Math.E;
Math.E=1;
if (Math.E !==__e){
  $ERROR('#1: __e = Math.E; Math.E=1; Math.E ===__e');
}

