// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration inside the "if" Expression is evaluated as true and function will not be declarated
 *
 * @path ch12/12.5/S12.5_A5.js
 * @description The "if" Expression is "function __func(){throw "FunctionExpression";}"
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	__func=__func;
	$ERROR('#1: "__func=__func" lead to throwing exception');
} catch (e) {
	;
}
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try {
	if(function __func(){throw "FunctionExpression";}) (function(){throw "TrueBranch"})(); else (function(){"MissBranch"})();
} catch (e) {
	if (e !== "TrueBranch") {
		$ERROR('#2: Exception ==="TrueBranch". Actual:  Exception ==='+ e);
	}
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
try {
	__func=__func;
	$ERROR('#3: "__func=__func" lead to throwing exception');
} catch (e) {
	;
}
//
//////////////////////////////////////////////////////////////////////////////




