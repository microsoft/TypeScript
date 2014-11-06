// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Line Terminator between LeftHandSideExpression and "--" is not allowed
 *
 * @path ch11/11.3/11.3.2/S11.3.2_A1.1_T2.js
 * @description Checking Carriage Return
 * @negative
 */

//CHECK#1
eval("var x = 1; x\u000D--");

