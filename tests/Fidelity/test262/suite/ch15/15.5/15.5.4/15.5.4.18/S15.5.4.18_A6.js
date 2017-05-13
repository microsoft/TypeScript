// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase has not prototype property
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A6.js
 * @description Checking String.prototype.toUpperCase.prototype
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.toUpperCase.prototype !== undefined) {
  $ERROR('#1: String.prototype.toUpperCase.prototype === undefined. Actual: '+String.prototype.toUpperCase.prototype );
}
//
//////////////////////////////////////////////////////////////////////////////

