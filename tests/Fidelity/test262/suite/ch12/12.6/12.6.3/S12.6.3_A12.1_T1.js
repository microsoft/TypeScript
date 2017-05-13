// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If (Evaluate Statement).type is "break" and (Evaluate Statement).target is in the current label set, (normal, (Evaluate Statement), empty) is returned while evaluating a "var-loop"
 *
 * @path ch12/12.6/12.6.3/S12.6.3_A12.1_T1.js
 * @description Breaking a loop with "break"
 */

__str=""

for(var index=0; index<10; index+=1) {
	if (index>5)break;
	__str+=index;
}

if (__str!=="012345") {
	$ERROR('#1: __str === "012345". Actual:  __str ==='+ __str  );
}

