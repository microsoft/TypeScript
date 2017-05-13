// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object has properties such as built-in objects such as
 * Math, String, Date, parseInt, etc
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A1.1_T1.js
 * @description Global execution context - Value Properties
 */

//CHECK#1
if ( NaN === null ) {
  $ERROR("#1: NaN === null");
}

//CHECK#2
if ( Infinity === null ) {
  $ERROR("#2: Infinity === null");
}

//CHECK#3
if ( undefined === null ) {
  $ERROR("#3: undefined === null");
}

