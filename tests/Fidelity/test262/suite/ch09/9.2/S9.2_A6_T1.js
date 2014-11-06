// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of boolean conversion from object is true
 *
 * @path ch09/9.2/S9.2_A6_T1.js
 * @description Different objects convert to Boolean by explicit transformation
 */

// CHECK#1
if (Boolean(new Object()) !== true) {
  $ERROR('#1: Boolean(new Object()) === true. Actual: ' + (Boolean(new Object())));	
}

// CHECK#2
if (Boolean(new String("")) !== true) {
  $ERROR('#2: Boolean(new String("")) === true. Actual: ' + (Boolean(new String(""))));	
}

// CHECK#3
if (Boolean(new String()) !== true) {
  $ERROR('#3: Boolean(new String()) === true. Actual: ' + (Boolean(new String())));	
}

// CHECK#4
if (Boolean(new Boolean(true)) !== true) {
  $ERROR('#4: Boolean(new Boolean(true)) === true. Actual: ' + (Boolean(new Boolean(true))));	
}

// CHECK#5
if (Boolean(new Boolean(false)) !== true) {
  $ERROR('#5: Boolean(new Boolean(false)) === true. Actual: ' + (Boolean(new Boolean(false))));	
}

// CHECK#6
if (Boolean(new Boolean()) !== true) {
  $ERROR('#6: Boolean(new Boolean()) === true. Actual: ' + (Boolean(new Boolean())));	
}

// CHECK#7
if (Boolean(new Array()) !== true) {
  $ERROR('#7: Boolean(new Array()) === true. Actual: ' + (Boolean(new Array())));	
}

// CHECK#8
if (Boolean(new Number()) !== true) {
  $ERROR('#8: Boolean(new Number()) === true. Actual: ' + (Boolean(new Number())));	
}

// CHECK#9
if (Boolean(new Number(-0)) !== true) {
  $ERROR('#9: Boolean(new Number(-0)) === true. Actual: ' + (Boolean(new Number(-0))));	
}

// CHECK#10
if (Boolean(new Number(0)) !== true) {
  $ERROR('#10: Boolean(new Number(0)) === true. Actual: ' + (Boolean(new Number(0))));	
}

// CHECK#11
if (Boolean(new Number()) !== true) {
  $ERROR('#11: Boolean(new Number()) === true. Actual: ' + (Boolean(new Number())));	
}

// CHECK#12
if (Boolean(new Number(Number.NaN)) !== true) {
  $ERROR('#12: Boolean(new Number(Number.NaN)) === true. Actual: ' + (Boolean(new Number(Number.NaN))));	
}

// CHECK#13
if (Boolean(new Number(-1)) !== true) {
  $ERROR('#13: Boolean(new Number(-1)) === true. Actual: ' + (Boolean(new Number(-1))));	
}

// CHECK#14
if (Boolean(new Number(1)) !== true) {
  $ERROR('#14: Boolean(new Number(1)) === true. Actual: ' + (Boolean(new Number(1))));	
}

// CHECK#15
if (Boolean(new Number(Number.POSITIVE_INFINITY)) !== true) {
  $ERROR('#15: Boolean(new Number(Number.POSITIVE_INFINITY)) === true. Actual: ' + (Boolean(new Number(Number.POSITIVE_INFINITY))));	
}

// CHECK#16
if (Boolean(new Number(Number.NEGATIVE_INFINITY)) !== true) {
  $ERROR('#16: Boolean(new Number(Number.NEGATIVE_INFINITY)) === true. Actual: ' + (Boolean(new Number(Number.NEGATIVE_INFINITY))));	
}

// CHECK#17
if (Boolean(new Function()) !== true) {
  $ERROR('#17: Boolean(new Function()) === true. Actual: ' + (Boolean(new Function())));	
}

// CHECK#18
if (Boolean(new Date()) !== true) {
  $ERROR('#18: Boolean(new Date()) === true. Actual: ' + (Boolean(new Date())));	
}

// CHECK#19
if (Boolean(new Date(0)) !== true) {
  $ERROR('#19: Boolean(new Date(0)) === true. Actual: ' + (Boolean(new Date(0))));	
}

