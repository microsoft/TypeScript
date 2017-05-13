// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * TryStatement: "try Block Catch" or "try Block Finally" or "try Block Catch Finally"
 *
 * @path ch12/12.14/S12.14_A16_T8.js
 * @description Block: "{ StatementList }". Catch: "catch (Identifier ) Block". Checking if execution of "try{} catch(){finally{}" fails
 * @negative
 */

// CHECK#1
try{}
catch(){
finally{}



