// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleUpperCase has not prototype property
 *
 * @path ch15/15.5/15.5.4/15.5.4.19/S15.5.4.19_A6.js
 * @description Checking String.prototype.toLocaleUpperCase.prototype
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.toLocaleUpperCase.prototype !== undefined) {
  $ERROR('#1: String.prototype.toLocaleUpperCase.prototype === undefined. Actual: '+String.prototype.toLocaleUpperCase.prototype );
}
//
//////////////////////////////////////////////////////////////////////////////

