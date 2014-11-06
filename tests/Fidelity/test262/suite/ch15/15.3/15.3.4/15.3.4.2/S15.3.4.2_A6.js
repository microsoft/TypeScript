// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function.prototype.toString has not prototype property
 *
 * @path ch15/15.3/15.3.4/15.3.4.2/S15.3.4.2_A6.js
 * @description Checking if obtaining the prototype property of Function.prototype.toString fails
 */

//CHECK#1
if (Function.prototype.toString.prototype !== undefined) {
  $ERROR('#1: Function.prototype.toString has not prototype property'+Function.prototype.toString.prototype);
}

