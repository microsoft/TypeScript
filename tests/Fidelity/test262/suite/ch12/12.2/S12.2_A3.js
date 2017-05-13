// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration produces a new scope
 *
 * @path ch12/12.2/S12.2_A3.js
 * @description Using Global scope and Function scope together
 */

var __var = "OUT";

(function(){
    var __var ="IN";
	(function(){__var = "INNER_SPACE";})();
	(function(){var __var = "INNER_SUN";})();
	//////////////////////////////////////////////////////////////////////////////
	//CHECK#1
    if (__var !== "INNER_SPACE") {
    	$ERROR('#1: __var === "INNER_SPACE". Actual:  __var ==='+ __var  );
    }
	//
	//////////////////////////////////////////////////////////////////////////////
})();

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__var !== "OUT") {
	$ERROR('#2: __var === "OUT". Actual:  __var ==='+ __var  );
}
//
//////////////////////////////////////////////////////////////////////////////


(function(){
    __var ="IN";
	(function(){__var = "INNERED"})();
	(function(){var __var = "INNAGER"})();
	//////////////////////////////////////////////////////////////////////////////
	//CHECK#3
    if (__var!=="INNERED") {
    	$ERROR('#3: __var==="INNERED". Actual:  __var==='+ __var );
    }
	//
	//////////////////////////////////////////////////////////////////////////////
})();

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__var!=="INNERED") {
	$ERROR('#4: __var==="INNERED". Actual:  __var==='+ __var );
}
//
//////////////////////////////////////////////////////////////////////////////

