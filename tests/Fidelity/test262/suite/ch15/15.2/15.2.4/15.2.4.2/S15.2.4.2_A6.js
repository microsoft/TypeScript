// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Object.prototype.toString has not prototype property
 *
 * @path ch15/15.2/15.2.4/15.2.4.2/S15.2.4.2_A6.js
 * @description Checking if obtaining the prototype property of Object.prototype.toString fails
 */

//CHECK#1
if (Object.prototype.toString.prototype !== undefined) {
  $ERROR('#1: Object.prototype.toString has not prototype property'+Object.prototype.toString.prototype);
}
//

