// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the argument len is a Number and ToUint32(len) is equal to len,
 * then the length property of the newly constructed object is set to ToUint32(len)
 *
 * @path ch15/15.4/15.4.2/15.4.2.2/S15.4.2.2_A2.1_T1.js
 * @description Array constructor is given one argument
 */

//CHECK#1
var x = new Array(0); 
if (x.length !== 0) {
  $ERROR('#1: var x = new Array(0); x.length === 0. Actual: ' + (x.length));
}

//CHECK#2
var x = new Array(1); 
if (x.length !== 1) {
  $ERROR('#2: var x = new Array(1); x.length === 1. Actual: ' + (x.length));
}   

//CHECK#3
var x = new Array(4294967295); 
if (x.length !== 4294967295) {
  $ERROR('#3: var x = new Array(4294967295); x.length === 4294967295. Actual: ' + (x.length));
} 

