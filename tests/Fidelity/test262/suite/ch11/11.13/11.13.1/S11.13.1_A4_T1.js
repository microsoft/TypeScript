// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * AssignmentExpression : LeftHandSideExpression = AssignmentExpression
 *
 * @path ch11/11.13/11.13.1/S11.13.1_A4_T1.js
 * @description Syntax check
 */

//CHECK#1
x = x = 1;
if (x !== 1) {
  $ERROR('#1: The expression x = x = 1 is the same x = (x = 1), not (x = x) = 1. Actual: ' + (x));
}



