// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleLowerCase has not prototype property
 *
 * @path ch15/15.5/15.5.4/15.5.4.17/S15.5.4.17_A6.js
 * @description Checking String.prototype.toLocaleLowerCase.prototype
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.toLocaleLowerCase.prototype !== undefined) {
  $ERROR('#1: String.prototype.toLocaleLowerCase.prototype === undefined. Actual: '+String.prototype.toLocaleLowerCase.prototype );
}
//
//////////////////////////////////////////////////////////////////////////////

