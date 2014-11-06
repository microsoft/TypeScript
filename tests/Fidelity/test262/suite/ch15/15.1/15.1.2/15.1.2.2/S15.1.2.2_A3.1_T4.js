// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToNumber
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A3.1_T4.js
 * @description Checking for Boolean object
 */

//CHECK#1
if (parseInt("11", new Boolean(false)) !== parseInt("11", false)) {
  $ERROR('#1: parseInt("11", new Boolean(false)) === parseInt("11", false). Actual: ' + (parseInt("11", new Boolean(false))));
}

//CHECK#2
if (isNaN(parseInt("11", new Boolean(true))) !== true) {
  $ERROR('#2: parseInt("11", new Boolean(true)) === Not-a-Number. Actual: ' + (parseInt("11", new Boolean(true))));
}

