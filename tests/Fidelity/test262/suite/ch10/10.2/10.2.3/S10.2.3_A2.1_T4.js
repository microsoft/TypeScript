// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object properties have attributes { DontEnum }
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A2.1_T4.js
 * @description Global execution context - Other Properties
 */

//CHECK#1
for (var x in this) {
  if ( x === 'Math' ) {
    $ERROR("#1: 'Math' have attribute DontEnum");
  }
}

