// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A property name P (in the form of a string value) is an array index
 * if and only if ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal to 2^32 - 1
 *
 * @path ch15/15.4/S15.4_A1.1_T2.js
 * @description Checking for number primitive
 */

//CHECK#1
x = [];
x[NaN] = 1;
if (x[0] !== undefined) {
  $ERROR('#1: x = []; x[NaN] = 1; x[0] === undefined. Actual: ' + (x[0]));  
} 

//CHECK#2
if (x["NaN"] !== 1) {
  $ERROR('#2: x = []; x[NaN] = 1; x["NaN"] === 1. Actual: ' + (x["NaN"]));  
} 

//CHECK#3
y = [];
y[Number.POSITIVE_INFINITY] = 1;
if (y[0] !== undefined) {
  $ERROR('#3: y = []; y[Number.POSITIVE_INFINITY] = 1; y[0] === undefined. Actual: ' + (y[0]));  
}

//CHECK#4
if (y["Infinity"] !== 1) {
  $ERROR('#4: y = []; y[Number.POSITIVE_INFINITY] = 1; y["Infinity"] === 1. Actual: ' + (y["Infinity"]));  
} 

//CHECK#5
z = [];
z[Number.NEGATIVE_INFINITY] = 1;
if (z[0] !== undefined) {
  $ERROR('#5: z = []; z[Number.NEGATIVE_INFINITY] = 1; z[0] === undefined. Actual: ' + (z[0]));  
}

//CHECK#6
if (z["-Infinity"] !== 1) {
  $ERROR('#6: z = []; z[Number.NEGATIVE_INFINITY] = 1; z["-Infinity"] === 1. Actual: ' + (z["-Infinity"]));  
} 


