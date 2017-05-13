// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When number absolute value is bigger of 2**1024 should convert to Infinity
 *
 * @path ch08/8.5/S8.5_A14_T2.js
 * @description Create number smaller of -2**1024
 */

//CHECK #1 
if (-1e+308*3 !== -Infinity){
  $ERROR('#1: -1e+308*3 === Infinity. Actual: ' + (-1e+308*3));
}

//CHECK #2 
if ((-1*(Math.pow(2,53))*(Math.pow(2,971))) !== -Infinity){
  $ERROR('#2: (-1*(Math.pow(2,53))*(Math.pow(2,971))) === Infinity. Actual: ' + ((-1*(Math.pow(2,53))*(Math.pow(2,971)))));
}

