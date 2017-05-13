// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of division is determined by the specification of IEEE 754 arithmetics
 *
 * @path ch11/11.5/11.5.2/S11.5.2_A4_T7.js
 * @description Division of a zero by a zero results in NaN
 */

//CHECK#1
if (isNaN(+0 / +0) !== true) {
  $ERROR('#1: +0 / +0 === Not-a-Number. Actual: ' + (+0 / +0));
}  

//CHECK#2
if (isNaN(-0 / +0) !== true) {
  $ERROR('#2: -0 / +0 === Not-a-Number. Actual: ' + (-0 / +0)); 
} 

//CHECK#3
if (isNaN(+0 / -0) !== true) {
  $ERROR('#3: +0 / -0 === Not-a-Number. Actual: ' + (+0 / -0)); 
} 

//CHECK#4
if (isNaN(-0 / -0) !== true) {
  $ERROR('#4: -0 / -0 === Not-a-Number. Actual: ' + (-0 / -0));
} 

