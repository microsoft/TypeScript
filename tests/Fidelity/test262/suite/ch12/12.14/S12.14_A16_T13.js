// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * TryStatement: "try Block Catch" or "try Block Finally" or "try Block Catch Finally"
 *
 * @path ch12/12.14/S12.14_A16_T13.js
 * @description Catch: "catch (Identifier ) Block". Checking if execution of "22" passes at the place of Identifier of "catch"
 * @negative
 */

// CHECK#1
try
{
}
catch("22")
{
}




