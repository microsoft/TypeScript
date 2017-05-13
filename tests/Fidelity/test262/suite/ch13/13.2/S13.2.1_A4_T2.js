// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Objects as arguments are passed by reference
 *
 * @path ch13/13.2/S13.2.1_A4_T2.js
 * @description Adding new string property to a function argument within the function body,
 * where explicit argument is an object defined with "__obj={}"
 */

function __func(__arg){
    __arg.foo="whiskey gogo";
}

var __obj={};

 __func(__obj);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.foo !== "whiskey gogo") {
	$ERROR('#1: __obj.foo === "whiskey gogo". Actual: __obj.foo ==='+__obj.foo);
}
//
//////////////////////////////////////////////////////////////////////////////

