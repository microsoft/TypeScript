// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of StringNumericLiteral ::: [empty] is 0
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A1.js
 * @description Number('') convert to Number by explicit transformation
 */

// CHECK#1
if (Number("") !== 0) {
  $ERROR('#1.1: Number("") === 0. Actual: ' + (Number("")));
} else {
  if (1/Number("") !== Number.POSITIVE_INFINITY) {
    $ERROR('#1.2: Number("") == +0. Actual: -0');
  }
}

