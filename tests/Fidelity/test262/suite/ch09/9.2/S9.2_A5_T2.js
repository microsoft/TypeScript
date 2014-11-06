// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of boolean conversion from nonempty string value (length is not zero) is true; from empty String (length is zero) is false
 *
 * @path ch09/9.2/S9.2_A5_T2.js
 * @description "" convert to Boolean by implicit transformation
 */

// CHECK#1
if (!("") !== true) {
  $ERROR('#1: !("") === true. Actual: ' + (!("")));
}

