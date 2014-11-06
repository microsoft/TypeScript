// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "in"-expression is not allowed as a ExpressionNoIn in "for (ExpressionNoIn; FirstExpression; SecondExpression) Statement" IterationStatement
 *
 * @path ch12/12.6/12.6.3/S12.6.3_A4.1.js
 * @description Checking if execution of "for (var a in arr;1;){}" fails
 * @negative
 */

arr = [1,2,3,4,5];

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
for (var a in arr;1;){
    break;
}
//
//////////////////////////////////////////////////////////////////////////////


