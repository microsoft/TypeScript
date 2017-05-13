// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * isNaN applies ToNumber to its argument, then return true if the result is NaN, and otherwise return false
 *
 * @path ch15/15.1/15.1.2/15.1.2.4/S15.1.2.4_A1_T1.js
 * @description Checking all primitive
 */

// CHECK#1
if (!(isNaN(NaN) === true)) {
	$ERROR('#1: NaN === Not-a-Number. Actual: ' + (NaN)); 
}

// CHECK#2
if (!(isNaN(Number.NaN) === true)) {
	$ERROR('#2: Number.NaN === Not-a-Number. Actual: ' + (Number.NaN)); 
}

// CHECK#3
if (!(isNaN(Number(void 0)) === true)) {
	$ERROR('#3: Number(void 0) === Not-a-Number. Actual: ' + (Number(void 0))); 
}

// CHECK#4
if (!(isNaN(void 0) === true)) {
	$ERROR('#4: void 0 === Not-a-Number. Actual: ' + (void 0)); 
}

// CHECK#5
if (!(isNaN("string") === true)) {
	$ERROR('#5: "string" === Not-a-Number. Actual: ' + ("string")); 
}

// CHECK#6
if (isNaN(Number.POSITIVE_INFINITY) === true) {
	$ERROR('#6: Number.POSITIVE_INFINITY !== Not-a-Number'); 
}

// CHECK#7
if (isNaN(Number.NEGATIVE_INFINITY) === true) {
	$ERROR('#7: Number.NEGATIVE_INFINITY !== Not-a-Number'); 
}

// CHECK#8
if (isNaN(Number.MAX_VALUE) === true) {
	$ERROR('#8: Number.MAX_VALUE !== Not-a-Number'); 
}

// CHECK#9
if (isNaN(Number.MIN_VALUE) === true) {
	$ERROR('#9: Number.MIN_VALUE !== Not-a-Number'); 
}

// CHECK#10
if (isNaN(-0) === true) {
	$ERROR('#10: -0 !== Not-a-Number'); 
}

// CHECK#11
if (isNaN(true) === true) {
  $ERROR('#11: true !== Not-a-Number'); 
}

// CHECK#12
if (isNaN("1") === true) {
  $ERROR('#12: "1" !== Not-a-Number'); 
}





