// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When Function object(F) is constructed
 * the [[Prototype]] property of F is set to the original Function prototype object as specified in 15.3.3.1
 *
 * @path ch13/13.2/S13.2_A5.js
 * @description Function.prototype.isPrototypeOf() is used
 */

function __func(){};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(Function.prototype.isPrototypeOf(__func))) {
	$ERROR('#1: Function.prototype.isPrototypeOf(__func)');
}
//
//////////////////////////////////////////////////////////////////////////////


var __gunc = function(){};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (!(Function.prototype.isPrototypeOf(__gunc))) {
	$ERROR('#1: Function.prototype.isPrototypeOf(__gunc)');
}
//
//////////////////////////////////////////////////////////////////////////////



