// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of an addition is determined using the rules of IEEE 754 double-precision arithmetics
 *
 * @path ch11/11.6/11.6.1/S11.6.1_A4_T5.js
 * @description The sum of two negative zeros is -0. The sum of two positive zeros, or of two zeros of opposite sign is +0
 */

//CHECK#1
if (-0 + -0 !== -0 ) {  
  $ERROR('#1.1: -0 + -0 === 0. Actual: ' + (-0 + -0));
} else {
  if (1 / (-0 + -0) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#1.1: -0 + -0 === - 0. Actual: +0');
  }
}

//CHECK#2
if (0 + -0 !== 0 ) {  
  $ERROR('#2.1: 0 + -0 === 0. Actual: ' + (0 + -0));
} else {
  if (1 / (0 + -0) !== Number.POSITIVE_INFINITY) {
    $ERROR('#2.2: 0 + -0 === + 0. Actual: -0');
  }
}

//CHECK#3
if (-0 + 0 !== 0 ) {  
  $ERROR('#3.1: -0 + 0 === 0. Actual: ' + (-0 + 0));
} else {
  if (1 / (-0 + 0) !== Number.POSITIVE_INFINITY) {
    $ERROR('#3.2: -0 + 0 === + 0. Actual: -0');
  }
}

//CHECK#4
if (0 + 0 !== 0 ) {  
  $ERROR('#4.1: 0 + 0 === 0. Actual: ' + (0 + 0));
} else {
  if (1 / (0 + 0) !== Number.POSITIVE_INFINITY) {
    $ERROR('#4.2: 0 + 0 === + 0. Actual: -0');
  }
}

