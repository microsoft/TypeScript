// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionExpression within a "do-while" statement is allowed, but no function with the given name will appear in the global context
 *
 * @path ch12/12.6/12.6.1/S12.6.1_A10.js
 * @description Also this a test on FunctionExpression
 */

var check = 0;
do {    
  if(typeof(f) === "function"){
    check = -1;        
    break; 
  } else {
    check = 1;        
    break; 
  }
} while(function f(){});

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (check !== 1) {
	$ERROR('#1: FunctionExpression within a "do-while" statement is allowed, but no function with the given name will appear in the global context');
}
//
//////////////////////////////////////////////////////////////////////////////

