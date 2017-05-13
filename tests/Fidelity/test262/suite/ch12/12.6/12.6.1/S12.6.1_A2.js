// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * While evaluating "do Statement while ( Expression )", Statement is evaluated first and only after it is done Expression is checked
 *
 * @path ch12/12.6/12.6.1/S12.6.1_A2.js
 * @description Evaluating Statement with error Expression
 */

try {
	do __in__do = "reached"; while (abbracadabra);
	$ERROR('#1: \'do __in__do = "reached"; while (abbracadabra)\' lead to throwing exception');
} catch (e) {
    if (e instanceof Test262Error) throw e;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__in__do !== "reached") {
	$ERROR('#1.1: __in__do === "reached". Actual:  __in__do ==='+ __in__do  );
}
//
//////////////////////////////////////////////////////////////////////////////



