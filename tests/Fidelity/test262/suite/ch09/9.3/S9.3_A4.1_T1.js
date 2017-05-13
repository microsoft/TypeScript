// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from number value equals to the input argument (no conversion)
 *
 * @path ch09/9.3/S9.3_A4.1_T1.js
 * @description Some numbers including Number.MAX_VALUE and Number.MIN_VALUE are converted to Number with explicit transformation
 */

// CHECK#1
if (Number(13) !== 13) {
  $ERROR('#1: Number(13) === 13. Actual: ' + (Number(13)));
}

// CHECK#2
if (Number(-13) !== -13) { 
  $ERROR('#2: Number(-13) === -13. Actual: ' + (Number(-13)));
}

// CHECK#3
if (Number(1.3) !== 1.3) {
  $ERROR('#3: Number(1.3) === 1.3. Actual: ' + (Number(1.3)));
}

// CHECK#4
if (Number(-1.3) !== -1.3) {
  $ERROR('#4: Number(-1.3) === -1.3. Actual: ' + (Number(-1.3)));
}

// CHECK#5
if (Number(Number.MAX_VALUE) !== 1.7976931348623157e308) {
  $ERROR('#5: Number(Number.MAX_VALUE) === 1.7976931348623157e308. Actual: ' + (Number(Number.MAX_VALUE)));
}

// CHECK#6
if (Number(Number.MIN_VALUE) !== 5e-324) {
  $ERROR('#6: Number(Number.MIN_VALUE) === 5e-324. Actual: ' + (Number(Number.MIN_VALUE)));
}	

