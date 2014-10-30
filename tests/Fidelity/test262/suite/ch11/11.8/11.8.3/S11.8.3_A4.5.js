// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is +Infinity and x !== y, return false
 *
 * @path ch11/11.8/11.8.3/S11.8.3_A4.5.js
 * @description y is number primitive
 */

//CHECK#1
if ((Number.POSITIVE_INFINITY <= 0) !== false) {
  $ERROR('#1: (+Infinity <= 0) === false');
}

//CHECK#2
if ((Number.POSITIVE_INFINITY <= 1.1) !== false) {
  $ERROR('#2: (+Infinity <= 1.1) === false');
}

//CHECK#3
if ((Number.POSITIVE_INFINITY <= -1.1) !== false) {
  $ERROR('#3: (+Infinity <= -1.1) === false');
}

//CHECK#4
if ((Number.POSITIVE_INFINITY <= Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#4: (+Infinity <= -Infinity) === false');
}

//CHECK#5
if ((Number.POSITIVE_INFINITY <= Number.MAX_VALUE) !== false) {
  $ERROR('#5: (+Infinity <= Number.MAX_VALUE) === false');
}

//CHECK#6
if ((Number.POSITIVE_INFINITY <= Number.MIN_VALUE) !== false) {
  $ERROR('#6: (+Infinity <= Number.MIN_VALUE) === false');
}


