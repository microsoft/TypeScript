// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Any variable that has not been assigned a value has the value undefined
 *
 * @path ch08/8.1/S8.1_A2_T2.js
 * @description Function return undefined
 */

// CHECK#1
function test1(x) {
	return x;
}

if (!(test1() === void 0)) {
  $ERROR('#1: function test1(x){return x} test1() === void 0. Actual: ' + (test1()));
}

// CHECK#2
function test2() {  
}

if (!(test2() === void 0)) {
  $ERROR('#2: function test2(){} test2() === void 0. Actual: ' + (test2()));
}

