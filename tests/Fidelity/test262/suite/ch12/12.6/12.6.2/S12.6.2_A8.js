// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "continue" statement within a "while" Statement is allowed
 *
 * @path ch12/12.6/12.6.2/S12.6.2_A8.js
 * @description using eval
 */

var __condition = 0, __odds=0;

__evaluated = eval("while(__condition < 10) { __condition++; if (((''+__condition/2).split('.')).length>1) continue; __odds++;}");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__odds !== 5) {
	$ERROR('#1: __odds === 5. Actual:  __odds ==='+ __odds  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__evaluated !== 4) {
	$ERROR('#2: __evaluated === 4. Actual:  __evaluated ==='+ __evaluated  );
}
//
//////////////////////////////////////////////////////////////////////////////


