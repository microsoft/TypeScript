// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When Function object(F) is constructed the length property of F is set to the number of formal properties specified in FormalParameterList
 *
 * @path ch13/13.2/S13.2_A3.js
 * @description Creating functions with various FormalParameterList and checking their lengths
 */

function __func(){};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func.length !== 0) {
	$ERROR('#1: __func.length === 0. Actual: __func.length ==='+__func.length);
}
//
//////////////////////////////////////////////////////////////////////////////

function __gunc(a,b,c){};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__gunc.length !== 3) {
	$ERROR('#2: __gunc.length === 3. Actual: __gunc.length ==='+__gunc.length);
}
//
//////////////////////////////////////////////////////////////////////////////


