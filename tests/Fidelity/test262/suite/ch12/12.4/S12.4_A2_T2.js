// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production ExpressionStatement : [lookahead \notin {{, function}] Expression; is evaluated as follows:
 * 1. Evaluate Expression.
 * 2. Call GetValue(Result(1)).
 * 3. Return (normal, Result(2), empty)
 *
 * @path ch12/12.4/S12.4_A2_T2.js
 * @description Checking by using eval(eval(x), where x is any string)
 */

x="5+1|0===0";

__evaluated = eval(x);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__evaluated !== 7) {
	$ERROR('#1: __evaluated === 7. Actual:  __evaluated ==='+ __evaluated  );
}
//
//////////////////////////////////////////////////////////////////////////////

__evaluated = eval("2*"+x+">-1");

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__evaluated !== 11) {
	$ERROR('#2: __evaluated === 11. Actual:  __evaluated ==='+ __evaluated  );
}
//
//////////////////////////////////////////////////////////////////////////////

