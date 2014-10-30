// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Object.prototype.valueOf has not prototype property
 *
 * @path ch15/15.2/15.2.4/15.2.4.4/S15.2.4.4_A6.js
 * @description Checking if obtaining the prototype property of Object.prototype.valueOf fails
 */

//CHECK#1
if (Object.prototype.valueOf.prototype !== undefined) {
  $ERROR('#1: Object.prototype.valueOf has not prototype property'+Object.prototype.valueOf.prototype);
}
//

