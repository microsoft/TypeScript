// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.replace has not prototype property
 *
 * @path ch15/15.5/15.5.4/15.5.4.11/S15.5.4.11_A6.js
 * @description Checking String.prototype.replace.prototype;
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.replace.prototype !== undefined) {
  $ERROR('#1: String.prototype.replace.prototype === undefined. Actual: '+String.prototype.replace.prototype );
}
//
//////////////////////////////////////////////////////////////////////////////

