// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Objects as arguments are passed by reference
 *
 * @path ch13/13.2/S13.2.1_A4_T4.js
 * @description Adding new number property to a function argument within the function body,
 * where array element "arguments[0]" is an object defined with "var __obj={}"
 */

function __func(){
    arguments[0]["E"]=2.74;
}

var __obj={};

__func(__obj);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.E !== 2.74) {
	$ERROR('#1: __obj.E === 2.74. Actual: __obj.E ==='+__obj.E);
}
//
//////////////////////////////////////////////////////////////////////////////

