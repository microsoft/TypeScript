// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.localeCompare has not prototype property
 *
 * @path ch15/15.5/15.5.4/15.5.4.9/S15.5.4.9_A6.js
 * @description Checking String.prototype.localeCompare.prototype
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.localeCompare.prototype !== undefined) {
  $ERROR('#1: String.prototype.localeCompare.prototype === undefined. Actual: '+String.prototype.localeCompare.prototype );
}
//
//////////////////////////////////////////////////////////////////////////////

