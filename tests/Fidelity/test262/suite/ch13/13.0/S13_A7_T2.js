// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The FunctionBody must be SourceElements
 *
 * @path ch13/13.0/S13_A7_T2.js
 * @description Inserting elements that is different from SourceElements into the FunctionBody
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try{
	eval("function __func(){/ ABC}");
	$ERROR('#1: eval("function __func(){/ ABC}") lead to throwing exception');
} catch(e){
	if(!(e instanceof SyntaxError)){
		$ERROR('#1.1: eval("function __func(){/ ABC}") lead to throwing exception of SyntaxError. Actual: exception is '+e);
	}
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
try{
	eval("function __func(){&1}");
	$ERROR('#3: eval("function __func(){&1}") lead to throwing exception');
} catch(e){
	if(!(e instanceof SyntaxError)){
		$ERROR('#3.1: eval("function __func(){&1}") lead to throwing exception of SyntaxError. Actual: exception is '+e);
	}
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
try{
	eval("function __func(){# ABC}");
	$ERROR('#4: eval("function __func(){# ABC}") lead to throwing exception');
} catch(e){
	if(!(e instanceof SyntaxError)){
		$ERROR('#4.1: eval("function __func(){# ABC}") lead to throwing exception of SyntaxError. Actual: exception is '+e);
	}
}
//
//////////////////////////////////////////////////////////////////////////////

