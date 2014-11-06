// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is greater or equal than y and these values are both finite non-zero, return true; otherwise, return false
 *
 * @path ch11/11.8/11.8.4/S11.8.4_A4.9.js
 * @description x and y are number primitives
 */

//CHECK#1
if ((1 >= 1.1) !== false) {
  $ERROR('#1: (1 >= 1.1) === false');
}

//CHECK#2
if ((1.1 >= 1) !== true) {
  $ERROR('#2: (1.1 >= 1) === true');
}

//CHECK#3
if ((-1 >= -1.1) !== true) {
  $ERROR('#3: (-1 >= -1.1) === true');
}

//CHECK#4
if ((-1.1 >= -1) !== false) {
  $ERROR('#4: (-1.1 >= -1) === false');
}

//CHECK#5
if ((0.1 >= 0) !== true) {
  $ERROR('#5: (0.1 >= 0) === true');
}

//CHECK#6
if ((0 >= -0.1) !== true) {
  $ERROR('#6: (0 >= -0.1) === true');
}

//CHECK#7
if ((Number.MAX_VALUE >= Number.MAX_VALUE/2) !== true) {
  $ERROR('#7: (Number.MAX_VALUE >= Number.MAX_VALUE/2) === true');
}

//CHECK#8
if ((Number.MIN_VALUE*2 >= Number.MIN_VALUE) !== true) {
  $ERROR('#8: (Number.MIN_VALUE*2 >= Number.MIN_VALUE) === true');
}



