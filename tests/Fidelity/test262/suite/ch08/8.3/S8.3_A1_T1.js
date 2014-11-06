// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Boolean type have two values, called true and false
 *
 * @path ch08/8.3/S8.3_A1_T1.js
 * @description Assign true and false to variables
 */

if (x !== undefined) {
    $ERROR("#0 x !== undefined, but actual is "+ x);
}   

////////////////////////////////////////////////////////////////////////
// CHECK#1
var x = true;
var y = false;

if (x !== true) {
    $ERROR("#1.1 x !== true, but actual is "+ x);
} 

if (y !== false) {
    $ERROR("#1.1 y !== false, but actual is "+ y);
} 

//
////////////////////////////////////////////////////////////////////////

