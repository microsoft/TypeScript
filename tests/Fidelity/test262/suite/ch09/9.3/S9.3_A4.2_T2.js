// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from number value equals to the input argument (no conversion)
 *
 * @path ch09/9.3/S9.3_A4.2_T2.js
 * @description Number.NaN, +0, -0, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY,
 * Number.MAX_VALUE and Number.MIN_VALUE convert to Number by implicit transformation
 */

// CHECK#1
if (isNaN(+(Number.NaN)) !== true) {
  $ERROR('#1: +(NaN) === Not-a-Number. Actual: ' + (+(NaN))); 
}

// CHECK#2
if (+(+0) !== +0) {
  $ERROR('#2.1: +(+0) === 0. Actual: ' + (+(+0))); 
} else {
  if (1/+(+0) !== Number.POSITIVE_INFINITY) {
    $ERROR('#2.2: +(+0) === +0. Actual: -0');
  }	
}

// CHECK#3
if (+(-0) !== -0) {
  $ERROR('#3.1: +(-0) === 0. Actual: ' + (+(-0))); 
} else {
  if (1/+(-0) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#3.2: +(-0) === -0. Actual: +0');
  }	
}

// CHECK#4
if (+(Number.POSITIVE_INFINITY) !== Number.POSITIVE_INFINITY) {
  $ERROR('#4: +(+Infinity) === +Infinity. Actual: ' + (+(+Infinity))); 
}

// CHECK#5
if (+(Number.NEGATIVE_INFINITY) !== Number.NEGATIVE_INFINITY) {
  $ERROR('#5: +(-Infinity) === -Infinity. Actual: ' + (+(-Infinity))); 
}

// CHECK#6
if (+(Number.MAX_VALUE) !== Number.MAX_VALUE) {
  $ERROR('#6: +(Number.MAX_VALUE) === Number.MAX_VALUE. Actual: ' + (+(Number.MAX_VALUE))); 
}

// CHECK#7
if (+(Number.MIN_VALUE) !== Number.MIN_VALUE) {
  $ERROR('#7: +(Number.MIN_VALUE) === Number.MIN_VALUE. Actual: ' + (+(Number.MIN_VALUE))); 
}

