// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.lastIndexOf has not prototype property
 *
 * @path ch15/15.5/15.5.4/15.5.4.8/S15.5.4.8_A6.js
 * @description Checking String.prototype.lastIndexOf.prototype
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.lastIndexOf.prototype !== undefined) {
  $ERROR('#1: String.prototype.lastIndexOf.prototype === undefined. Actual: '+String.prototype.lastIndexOf.prototype );
}
//
//////////////////////////////////////////////////////////////////////////////

