// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When Function object(F) is constructed the following steps from 9 to 11 take place
 * 9.Create a new object as would be constructed by the expression new Object().
 * 10. Set the constructor property of Result(9) to F. This property is given attributes { DontEnum }.
 * 11. Set the "prototype" property of F to Result(9).
 *
 * @path ch13/13.2/S13.2_A4_T1.js
 * @description Checking prototype, prototype.constructor properties and {DontEnum} property of a constructor.
 * Using "function __func(){}" as a FunctionDeclaration
 */

function __func(){};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __func.prototype !== 'object') {
	$ERROR('#1: typeof __func.prototype === \'object\'. Actual: typeof __gunc.prototype ==='+typeof __gunc.prototype);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__func.prototype.constructor !== __func) {
	$ERROR('#2: __func.prototype.constructor === __func. Actual: __gunc.prototype.constructor ==='+__gunc.prototype.constructor);
}
//
//////////////////////////////////////////////////////////////////////////////

var __constructor_was__enumed;

for (__prop in __func.prototype){
    if (__prop = 'constructor')
        __constructor_was__enumed = true;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__constructor_was__enumed) {
	$ERROR('#3: __constructor_was__enumed === false. Actual: __constructor_was__enumed ==='+__constructor_was__enumed);
}
//
//////////////////////////////////////////////////////////////////////////////






