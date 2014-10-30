// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is true, return x
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A4_T2.js
 * @description Type(x) and Type(y) vary between primitive number and Number object
 */

//CHECK#1
if ((-1 || 1) !== -1) {
  $ERROR('#1: (-1 || 1) === -1');
}

//CHECK#2
if ((1 || new Number(0)) !== 1) {
  $ERROR('#2: (1 || new Number(0)) === 1');
} 

//CHECK#3
if ((-1 || NaN) !== -1) {
  $ERROR('#3: (-1 || NaN) === -1');
}

//CHECK#4
var x = new Number(-1);
if ((x || new Number(0)) !== x) {
  $ERROR('#4: (var x = new Number(-1); (x || new Number(-1)) === x');
}

//CHECK#5
var x = new Number(NaN);
if ((x || new Number(1)) !== x) {
  $ERROR('#5: (var x = new Number(NaN); (x || new Number(1)) === x');
}

//CHECK#6
var x = new Number(0);
if ((x || new Number(NaN)) !== x) {
  $ERROR('#6: (var x = new Number(0); (x || new Number(NaN)) === x');
}

