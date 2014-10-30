// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A property name P (in the form of a string value) is an array index
 * if and only if ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal to 2^32 - 1
 *
 * @path ch15/15.4/S15.4_A1.1_T3.js
 * @description Checking for number primitive
 */

//CHECK#1
x = [];
x[4294967296] = 1;
if (x[0] !== undefined) {
  $ERROR('#1: x = []; x[4294967296] = 1; x[0] === undefined. Actual: ' + (x[0]));  
}

//CHECK#2
if (x["4294967296"] !== 1) {
  $ERROR('#2: x = []; x[4294967296] = 1; x["4294967296"] === 1. Actual: ' + (x["4294967296"]));  
}

//CHECK#3
y = [];
y[4294967297] = 1;
if (y[1] !== undefined) {
  $ERROR('#3: y = []; y[4294967297] = 1; y[1] === undefined. Actual: ' + (y[1]));  
} 

//CHECK#4
if (y["4294967297"] !== 1) {
  $ERROR('#4: y = []; y[4294967297] = 1; y["4294967297"] === 1. Actual: ' + (y["4294967297"]));  
}

//CHECK#5
z = [];
z[1.1] = 1;
if (z[1] !== undefined) {
  $ERROR('#5: z = []; z[1.1] = 1; z[1] === undefined. Actual: ' + (z[1]));  
}

//CHECK#6
if (z["1.1"] !== 1) {
  $ERROR('#6: z = []; z[1.1] = 1; z["1.1"] === 1. Actual: ' + (z["1.1"]));  
}  

