// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleLowerCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.17/S15.5.4.17_A1_T3.js
 * @description Checking by using eval
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (eval("\"BJ\"").toLocaleLowerCase() !== "bj") {
  $ERROR('#1: eval("\\"BJ\\"").toLocaleLowerCase() === "bj". Actual: '+eval("\"BJ\"").toLocaleLowerCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

