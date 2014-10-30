// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * In the "if" statement empty statement is allowed and is evaluated to "undefined"
 *
 * @path ch12/12.5/S12.5_A7.js
 * @description Checking by using eval "eval("if(1);"))"
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	var __evaluated = eval("if(1);");
	if (__evaluated !== undefined) {
		$ERROR('#1: __evaluated === undefined. Actual:  __evaluated ==='+ __evaluated  );
	}

} catch (e) {
	$ERROR('#1.1: "__evaluated = eval("if(1);")" does not lead to throwing exception');

}
//
//////////////////////////////////////////////////////////////////////////////

