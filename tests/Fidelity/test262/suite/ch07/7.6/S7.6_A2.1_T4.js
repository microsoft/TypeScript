// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * IdentifierPart :: IdentifierStart
 *
 * @path ch07/7.6/S7.6_A2.1_T4.js
 * @description IdentifierStart :: \UnicodeEscapeSequence
 */

//CHECK#1
try {
  var x\u0078 = 1;
  if (xx !== 1) {
    $ERROR('#1.1: var x\\u0078 = 1; xx === 1. Actual: ' + (xx));
  }
} catch (e) {
  $ERROR('#1.2: var x\\u0078 = 1; xx === 1. Actual: ' + (xx));
}

//CHECK#2
try {
  var \u0078\u0078 = 2;
  if (xx !== 2) {
    $ERROR('#2.1: var \\u0078\\u0078 = 1; xx === 2. Actual: ' + (xx));
  }
} catch (e) {
  $ERROR('#2.2: var \\u0078\\u0078 = 1; xx === 2. Actual: ' + (xx));
}

//CHECK#3
try {
  var \u0024\u0024 = 3;
  if ($$ !== 3) {
    $ERROR('#3.1: var \\u0024\\u0024 = 1; $$ === 3. Actual: ' + ($$));
  }
} catch (e) {
  $ERROR('#3.2: var \\u0024\\u0024 = 1; $$ === 3. Actual: ' + ($$));
}

//CHECK#4
try {
  var \u005F\u005F = 4;
  if (__ !== 4) {
    $ERROR('#4.1: var \\u005F\\u005F = 1; __ === 4. Actual: ' + (__));
  }
} catch (e) {
  $ERROR('#4.2: var \\u005F\\u005F = 1; __ === 4. Actual: ' + (__));
}

