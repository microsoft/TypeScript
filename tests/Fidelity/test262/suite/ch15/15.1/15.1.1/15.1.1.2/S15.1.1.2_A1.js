// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The initial value of Infinity is Number.POSITIVE_INFINITY
 *
 * @path ch15/15.1/15.1.1/15.1.1.2/S15.1.1.2_A1.js
 * @description Use typeof, isNaN, isFinite
 */

// CHECK#1
if (typeof(Infinity) !== "number") {
	$ERROR('#1: typeof(Infinity) === "number". Actual: ' + (typeof(Infinity))); 
}

// CHECK#2
if (isFinite(Infinity) !== false) {
	$ERROR('#2: Infinity === Not-a-Finite. Actual: ' + (Infinity)); 
}

// CHECK#3
if (isNaN(Infinity) !== false) {
	$ERROR('#3: Infinity === Not-a-Number. Actual: ' + (Infinity)); 
}


// CHECK#4
if (Infinity !== Number.POSITIVE_INFINITY) {
	$ERROR('#4: Infinity === Number.POSITIVE_INFINITY. Actual: ' + (Infinity)); 
}

