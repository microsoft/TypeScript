// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object properties have attributes { DontEnum }
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A2.1_T1.js
 * @description Global execution context - Value Properties
 */

//CHECK#1
for (var x in this) {
  if ( x === 'NaN' ) {
    $ERROR("#1: 'NaN' have attribute DontEnum");
  } else if ( x === 'Infinity' ) {
    $ERROR("#1: 'Infinity' have attribute DontEnum");
  } else if ( x === 'undefined' ) {
    $ERROR("#1: 'undefined' have attribute DontEnum");
  } 
}

