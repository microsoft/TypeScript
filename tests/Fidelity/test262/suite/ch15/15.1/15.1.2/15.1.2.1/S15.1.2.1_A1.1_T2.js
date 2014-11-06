// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is not a string value, return x
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A1.1_T2.js
 * @description Checking all object
 */

//CHECK#1
var x = {};
if (eval(x) !== x) {
  $ERROR('#1: x = {}; eval(x) === x. Actual: ' + (eval(x)));
}

//CHECK#2
x = new Number(1);
if (eval(x) !== x) {
  $ERROR('#2: x = new Number(1); eval(x) === x. Actual: ' + (eval(x)));
}

//CHECK#3
x = new Boolean(true);
if (eval(x) !== x) {
  $ERROR('#3: x = new Boolean(true); eval(x) === x. Actual: ' + (eval(x)));
}

//CHECK#4
x = new String("1+1");
if (eval(x) !== x) {
  $ERROR('#4: x = new String("1"); eval(x) === x. Actual: ' + (eval(x)));
}    

