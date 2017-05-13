// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of boolean conversion from number value is false if the argument is +0, -0, or NaN; otherwise, is true
 *
 * @path ch09/9.2/S9.2_A4_T3.js
 * @description Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY,
 * Number.MAX_VALUE, Number.MIN_VALUE and some numbers convert to Boolean by explicit transformation
 */

// CHECK#1
if (Boolean(Number.POSITIVE_INFINITY) !== true) {
  $ERROR('#1: Boolean(+Infinity) === true. Actual: ' + (Boolean(+Infinity))); 	
}

// CHECK#2;
if (Boolean(Number.NEGATIVE_INFINITY) !== true) {
  $ERROR('#2: Boolean(-Infinity) === true. Actual: ' + (Boolean(-Infinity))); 	
}

// CHECK#3
if (Boolean(Number.MAX_VALUE) !== true) {
  $ERROR('#3: Boolean(Number.MAX_VALUE) === true. Actual: ' + (Boolean(Number.MAX_VALUE))); 	
}

// CHECK#4
if (Boolean(Number.MIN_VALUE) !== true) {
  $ERROR('#4: Boolean(Number.MIN_VALUE) === true. Actual: ' + (Boolean(Number.MIN_VALUE))); 	
}

// CHECK#5
if (Boolean(13) !== true) {
  $ERROR('#5: Boolean(13) === true. Actual: ' + (Boolean(13)));	
}

// CHECK#6
if (Boolean(-13) !== true) {
  $ERROR('#6: Boolean(-13) === true. Actual: ' + (Boolean(-13)));	
}

// CHECK#7
if (Boolean(1.3) !== true) {
  $ERROR('#7: Boolean(1.3) === true. Actual: ' + (Boolean(1.3)));	
}

// CHECK#8
if (Boolean(-1.3) !== true) {
  $ERROR('#8: Boolean(-1.3) === true. Actual: ' + (Boolean(-1.3)));	
}	

