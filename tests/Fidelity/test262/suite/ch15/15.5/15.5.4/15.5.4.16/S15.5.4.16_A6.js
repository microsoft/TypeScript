// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLowerCase has not prototype property
 *
 * @path ch15/15.5/15.5.4/15.5.4.16/S15.5.4.16_A6.js
 * @description Checking String.prototype.toLowerCase.prototype
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.toLowerCase.prototype !== undefined) {
  $ERROR('#1: String.prototype.toLowerCase.prototype === undefined. Actual: '+String.prototype.toLowerCase.prototype );
}
//
//////////////////////////////////////////////////////////////////////////////

