// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * isNaN applies ToNumber to its argument, then return true if the result is NaN, and otherwise return false
 *
 * @path ch15/15.1/15.1.2/15.1.2.4/S15.1.2.4_A1_T2.js
 * @description Checking all object
 */

// CHECK#1
if (!(isNaN({}) === true)) {
	$ERROR('#1: {} === Not-a-Number. Actual: ' + ({})); 
}

// CHECK#2
if (!(isNaN(new String("string")) === true)) {
	$ERROR('#2: new String("string") === Not-a-Number. Actual: ' + (new String("string"))); 
}

// CHECK#3
if (isNaN(new String("1")) === true) {
  $ERROR('#3: new String("1") === Not-a-Number. Actual: ' + (new String("1"))); 
}

// CHECK#4
if (isNaN(new Number(1)) === true) {
	$ERROR('#4: new Number(1) !== Not-a-Number'); 
}

// CHECK#5
if (!(isNaN(new Number(NaN)) === true)) {
  $ERROR('#5: new Number(NaN) === Not-a-Number. Actual: ' + (new Number(NaN))); 
}

// CHECK#6
if (isNaN(new Boolean(true)) === true) {
  $ERROR('#6: new Boolean(true) !== Not-a-Number'); 
}





