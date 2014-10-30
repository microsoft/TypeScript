// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x++ returns ToNumber(x)
 *
 * @path ch11/11.3/11.3.1/S11.3.1_A4_T5.js
 * @description Type(x) is Object object or Function object
 */

//CHECK#1
var x = {}; 
var y = x++;
if (isNaN(y) !== true) {
  $ERROR('#1: var x = {}; var y = x++; y === Not-a-Number. Actual: ' + (y));
}

//CHECK#2
var x = function(){return 1}; 
var y = x++;
if (isNaN(y) !== true) {
  $ERROR('#2: var x = function(){return 1}; var y = x++; y === Not-a-Number. Actual: ' + (y));
}

