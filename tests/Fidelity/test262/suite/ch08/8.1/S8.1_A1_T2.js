// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Undefined type has one value, called undefined
 *
 * @path ch08/8.1/S8.1_A1_T2.js
 * @description Check typeof(undefined) and typeof(void 0)
 */

// CHECK#1
if (!(typeof(undefined) === "undefined")) { 
	ERROR('#1: typeof(undefined) === "undefined". Actual: ' + (typeof(undefined)));  
} 

// CHECK#2
if (!(typeof(void 0) === "undefined")) {  
	ERROR('#2: typeof(void 0) === "undefined". Actual: ' + (typeof(void 0)));  
}

// CHECK#3
if (!(undefined === void 0)) {  
	ERROR('#3: undefined === void 0');  
}

