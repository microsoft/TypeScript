// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since arguments property has attribute { DontDelete }, only its elements can be deleted
 *
 * @path ch13/13.0/S13_A11_T2.js
 * @description Checking if deleting the arguments property fails and then returning it
 */

function __func(){ 
    delete arguments;
    return arguments;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __func("A","B",1,2) !== "object") {
	$ERROR('#1: arguments property has attribute { DontDelete }');
}
//
//////////////////////////////////////////////////////////////////////////////

