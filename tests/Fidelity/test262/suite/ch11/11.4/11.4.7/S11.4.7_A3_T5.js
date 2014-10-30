// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator -x returns -ToNumber(x)
 *
 * @path ch11/11.4/11.4.7/S11.4.7_A3_T5.js
 * @description Type(x) is Object object or Function object
 */

//CHECK#1
if (isNaN(-{}) !== true) {
  $ERROR('#1: -{} === Not-a-Number. Actual: ' + (-{}));
}

//CHECK#2  
if (isNaN(-function(){return 1}) !== true) {
  $ERROR('#2: -function(){return 1} === Not-a-Number. Actual: ' + (-function(){return 1}));
}

