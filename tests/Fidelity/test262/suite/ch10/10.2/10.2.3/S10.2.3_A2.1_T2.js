// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object properties have attributes { DontEnum }
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A2.1_T2.js
 * @description Global execution context - Function Properties
 */

//CHECK#1
for (var x in this) {
  if ( x === 'eval' ) {
    $ERROR("#1: 'eval' have attribute DontEnum");
  } else if ( x === 'parseInt' ) {
    $ERROR("#1: 'parseInt' have attribute DontEnum");
  } else if ( x === 'parseFloat' ) {
    $ERROR("#1: 'parseFloat' have attribute DontEnum");
  } else if ( x === 'isNaN' ) {
    $ERROR("#1: 'isNaN' have attribute DontEnum");
  } else if ( x === 'isFinite' ) {
    $ERROR("#1: 'isFinite' have attribute DontEnum");
  } else if ( x === 'decodeURI' ) {
    $ERROR("#1: 'decodeURI' have attribute DontEnum");
  } else if ( x === 'decodeURIComponent' ) {
    $ERROR("#1: 'decodeURIComponent' have attribute DontEnum");
  } else if ( x === 'encodeURI' ) {
    $ERROR("#1: 'encodeURI' have attribute DontEnum");
  } else if ( x === 'encodeURIComponent' ) {
    $ERROR("#1: 'encodeURIComponent' have attribute DontEnum");
  } 
}

