// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of a ECMAScript floating-point remainder operation is determined by the rules of IEEE arithmetics
 *
 * @path ch11/11.5/11.5.3/S11.5.3_A4_T1.2.js
 * @description If either operand is NaN, the result is NaN
 */

//CHECK#1
if (isNaN(Number.NaN % Number.NaN) !== true) {
  $ERROR('#1: NaN % NaN === Not-a-Number. Actual: ' + (NaN % NaN));
}  

//CHECK#2
if (isNaN(+0 % Number.NaN) !== true) {
  $ERROR('#2: +0 % NaN === Not-a-Number. Actual: ' + (+0 % NaN)); 
} 

//CHECK#3
if (isNaN(-0 % Number.NaN) !== true) {
  $ERROR('#3: -0 % NaN === Not-a-Number. Actual: ' + (-0 % NaN)); 
} 

//CHECK#4
if (isNaN(Number.POSITIVE_INFINITY % Number.NaN) !== true) {
  $ERROR('#4: Infinity % NaN === Not-a-Number. Actual: ' + (Infinity % NaN));
} 

//CHECK#5
if (isNaN(Number.NEGATIVE_INFINITY % Number.NaN) !== true) {
  $ERROR('#5:  -Infinity % NaN === Not-a-Number. Actual: ' + ( -Infinity % NaN)); 
} 

//CHECK#6
if (isNaN(Number.MAX_VALUE % Number.NaN) !== true) {
  $ERROR('#6: Number.MAX_VALUE % NaN === Not-a-Number. Actual: ' + (Number.MAX_VALUE % NaN));
} 

//CHECK#7
if (isNaN(Number.MIN_VALUE % Number.NaN) !== true) {
  $ERROR('#7: Number.MIN_VALUE % NaN === Not-a-Number. Actual: ' + (Number.MIN_VALUE % NaN)); 
}

//CHECK#8
if (isNaN(1 % Number.NaN) !== true) {
  $ERROR('#8: 1 % NaN === Not-a-Number. Actual: ' + (1 % NaN));  
}

