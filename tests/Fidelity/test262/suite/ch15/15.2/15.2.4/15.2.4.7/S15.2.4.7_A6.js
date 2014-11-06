// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Object.prototype.propertyIsEnumerable has not prototype property
 *
 * @path ch15/15.2/15.2.4/15.2.4.7/S15.2.4.7_A6.js
 * @description Checking if obtaining the prototype property of Object.prototype.propertyIsEnumerable fails
 */

//CHECK#1
if (Object.prototype.propertyIsEnumerable.prototype !== undefined) {
  $ERROR('#1: Object.prototype.propertyIsEnumerable has not prototype property'+Object.prototype.propertyIsEnumerable.prototype);
}
//

