// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production StatementList  Statement is evaluated as follows
 * 1. Evaluate Statement.
 * 2. If an exception was thrown, return (throw, V, empty) where V is the exception
 *
 * @path ch12/12.1/S12.1_A2.js
 * @description Throwing exception within a Block
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	x();
	$ERROR('#1: "x()" lead to throwing exception');
} catch (e) {
	$PRINT(e.message);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try {
    throw "catchme";	
    $ERROR('#2: throw "catchme" lead to throwing exception');
} catch (e) {
	if (e!=="catchme") {
		$ERROR('#2.1: Exception === "catchme". Actual:  Exception ==='+ e  );
	}
}

//
//////////////////////////////////////////////////////////////////////////////

