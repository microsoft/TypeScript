// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object has properties such as built-in objects such as
 * Math, String, Date, parseInt, etc
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A1.1_T4.js
 * @description Global execution context - Other Properties
 */

//CHECK#27
if ( Math === null ) {
  $ERROR("#27: Math === null");
}

