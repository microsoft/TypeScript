// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function.prototype.apply has not prototype property
 *
 * @path ch15/15.3/15.3.4/15.3.4.3/S15.3.4.3_A12.js
 * @description Checking if obtaining the prototype property of Function.prototype.apply fails
 */

//CHECK#1
if (Function.prototype.apply.prototype !== undefined) {
  $ERROR('#1: Function.prototype.apply has not prototype property'+Function.prototype.apply.prototype);
}

