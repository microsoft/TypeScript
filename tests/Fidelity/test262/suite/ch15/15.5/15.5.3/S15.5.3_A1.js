// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String has length property whose value is 1
 *
 * @path ch15/15.5/15.5.3/S15.5.3_A1.js
 * @description Checking String.length
 */

//////////////////////////////////////////////////////////////////////////////
// CHECK#
if (String.length !== 1) {
  $ERROR('String has length property whose value is 1. Actual: String.length==='+String.length);
}
//
//////////////////////////////////////////////////////////////////////////////

