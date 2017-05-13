// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Objects as arguments are passed by reference
 *
 * @path ch13/13.2/S13.2.1_A4_T3.js
 * @description Adding new number property to a function argument within the function body,
 * where array element "arguments[0]" is an object defined with "__obj={}"
 */

function __func(){
    arguments[0]["PI"]=3.14;
}

var __obj={};

__func(__obj);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.PI !== 3.14) {
	$ERROR('#1: __obj.PI === 3.14. Actual: __obj.PI ==='+__obj.PI);
}
//
//////////////////////////////////////////////////////////////////////////////

