// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * While evaluating "for (ExpressionNoIn;;) Statement", Statement is evaulated first
 *
 * @path ch12/12.6/12.6.3/S12.6.3_A2.2.js
 * @description Using "(function(){throw "NoInExpression"})()" as ExpressionNoIn
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	for((function(){throw "NoInExpression"})();;) {
		throw "Statement";
	}
	$ERROR('#1: (function(){throw "NoInExpression"})() lead to throwing exception');
} catch (e) {
	if (e !== "NoInExpression") {
		$ERROR('#1: When for (ExpressionNoIn ;  ; ) Statement is evaluated NoInExpression evaluates first');
	}
}
//
//////////////////////////////////////////////////////////////////////////////

