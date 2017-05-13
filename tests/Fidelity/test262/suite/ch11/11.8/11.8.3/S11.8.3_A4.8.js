// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y is -Infinity and x !== y, return false
 *
 * @path ch11/11.8/11.8.3/S11.8.3_A4.8.js
 * @description x is number primitive
 */

//CHECK#1
if ((0 <= Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#1: (0 <= -Infinity) === false');
}

//CHECK#2
if ((1.1 <= Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#2: (1.1 <= -Infinity) === false');
}

//CHECK#3
if ((-1.1 <= Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#3: (-1.1 <= -Infinity) === false');
}

//CHECK#4
if ((Number.POSITIVE_INFINITY <= Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#4: (+Infinity <= -Infinity) === false');
}

//CHECK#5
if ((Number.MAX_VALUE <= Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#5: (Number.MAX_VALUE <= -Infinity) === false');
}

//CHECK#6
if ((Number.MIN_VALUE <= Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#6: (Number.MIN_VALUE <= -Infinity) === false');
}


