// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since arguments property has attribute { DontDelete }, only its elements can be deleted
 *
 * @path ch13/13.0/S13_A11_T1.js
 * @description Returning result of "delete arguments"
 */

function __func(){ return delete arguments;}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func("A","B",1,2)) {
	$ERROR('#1: arguments property has attribute { DontDelete }');
}
//
//////////////////////////////////////////////////////////////////////////////

