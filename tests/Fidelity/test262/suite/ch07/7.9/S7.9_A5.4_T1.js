// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check Prefix Decrement Operator for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A5.4_T1.js
 * @description Try use Variable1 \n --Variable2 construction
 */

//CHECK#1
var x = 1;
var y = 1;
x
--y
if (x !== 1) {
  $ERROR('#1: Check Prefix Decrement Operator for automatic semicolon insertion');
} else {
  if (y !== 0) {
    $ERROR('#1: Check Prefix Decrement Operator for automatic semicolon insertion');
  }
}

