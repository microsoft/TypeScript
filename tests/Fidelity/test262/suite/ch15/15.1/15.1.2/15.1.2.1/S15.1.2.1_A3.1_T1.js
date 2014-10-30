// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Result(3).type is normal and its completion value is a value V,
 * then return the value V
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A3.1_T1.js
 * @description Expression statement. Eval return primitive value
 */

var x;
//CHECK#1
if (eval("x = 1") !== 1) {
  $ERROR('#1: eval("x = 1") === 1. Actual: ' + (eval("x = 1")));
}

//CHECK#2
if (eval("1") !== 1) {
  $ERROR('#2: eval("1") === 1. Actual: ' + (eval("1")));
}

//CHECK#3
if (eval("'1'") !== '1') {
  $ERROR('#3: eval("\'1\'") === \'1\'. Actual: ' + (eval("'1'")));
}

//CHECK#4
x = 1;
if (eval("++x") !== 2) {
  $ERROR('#4: x = 1; eval("++x") === 2. Actual: ' + (x));
}        

