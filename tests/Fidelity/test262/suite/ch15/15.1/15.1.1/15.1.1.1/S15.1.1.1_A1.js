// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The initial value of NaN is NaN
 *
 * @path ch15/15.1/15.1.1/15.1.1.1/S15.1.1.1_A1.js
 * @description Use typeof, isNaN, isFinite
 */

// CHECK#1
if (typeof(NaN) !== "number") {
	$ERROR('#1: typeof(NaN) === "number". Actual: ' + (typeof(NaN))); 
}

// CHECK#2
if (isNaN(NaN) !== true) {
	$ERROR('#2: NaN === Not-a-Number. Actual: ' + (NaN)); 
}

// CHECK#3
if (isFinite(NaN) !== false) {
	$ERROR('#3: NaN === Not-a-Finite. Actual: ' + (NaN)); 
}


