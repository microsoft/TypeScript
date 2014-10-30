// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Z is empty, return NaN
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A7.1_T2.js
 * @description x is not a radix-R digit
 */

//CHECK#1
if (isNaN(parseInt("$0x")) !== true) {
  $ERROR('#1: parseInt("$0x") === Not-a-Number. Actual: ' + (parseInt("$0x")));
}

//CHECK#2
if (isNaN(parseInt("$0X")) !== true) {
  $ERROR('#2: parseInt("$0X") === Not-a-Number. Actual: ' + (parseInt("$0X")));
}

//CHECK#3
if (isNaN(parseInt("$$$")) !== true) {
  $ERROR('#3: parseInt("$$$") === Not-a-Number. Actual: ' + (parseInt("$$$")));
}

//CHECK#4
if (isNaN(parseInt("")) !== true) {
  $ERROR('#4: parseInt("") === Not-a-Number. Actual: ' + (parseInt("")));
}

//CHECK#5
if (isNaN(parseInt(" ")) !== true) {
  $ERROR('#5: parseInt(" ") === Not-a-Number. Actual: ' + (parseInt(" ")));
}          

