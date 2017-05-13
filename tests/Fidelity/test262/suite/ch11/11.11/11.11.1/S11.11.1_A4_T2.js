// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is true, return y
 *
 * @path ch11/11.11/11.11.1/S11.11.1_A4_T2.js
 * @description Type(x) and Type(y) vary between primitive number and Number object
 */

//CHECK#1
if ((-1 && -0) !== 0) {
  $ERROR('#1.1: (-1 && -0) === 0');
} else {
  if ((1 / (-1 && -0)) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#1.2: (-1 && -0) === -0');
  }
}

//CHECK#2
if ((-1 && 0) !== 0) {
  $ERROR('#2.1: (-1 && 0) === 0');
} else {
  if ((1 / (-1 && 0)) !== Number.POSITIVE_INFINITY) {
    $ERROR('#2.2: (-1 && 0) === +0');
  }
}

//CHECK#3
if ((isNaN(0.1 && NaN)) !== true) {
  $ERROR('#3: (0.1 && NaN) === Not-a-Number');
}

//CHECK#4
var y = new Number(0);
if ((new Number(-1) && y) !== y) {
  $ERROR('#4: (var y = new Number(0); (new Number(-1) && y) === y');
}

//CHECK#5
var y = new Number(NaN);
if ((new Number(0) && y) !== y) {
  $ERROR('#5: (var y = new Number(NaN); (new Number(0) && y) === y');
}

//CHECK#6
var y = new Number(-1);
if ((new Number(NaN) && y) !== y) {
  $ERROR('#6: (var y = new Number(-1); (new Number(NaN) && y) === y');
}

