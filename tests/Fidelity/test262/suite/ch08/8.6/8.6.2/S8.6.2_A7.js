// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Objects that implement internal method [[Construct]] are called constructors. Math object is NOT constructor
 *
 * @path ch08/8.6/8.6.2/S8.6.2_A7.js
 * @description Checking if execution of "var objMath=new Math" passes
 * @negative
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
var objMath=new Math;

//////////////////////////////////////////////////////////////////////////////

