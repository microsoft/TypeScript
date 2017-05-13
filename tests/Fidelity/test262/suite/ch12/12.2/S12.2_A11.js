// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When using property attributes, {ReadOnly} is not used
 *
 * @path ch12/12.2/S12.2_A11.js
 * @description Changing variable value using property attributes
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
this['__declared__var'] = "baloon";
if (this['__declared__var'] !== "baloon") {
	$ERROR('#1: this[\'__declared__var\'] === "baloon". Actual:  this[\'__declared__var\'] ==='+ this['__declared__var']  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__declared__var !== "baloon") {
	$ERROR('#2: __declared__var === "baloon". Actual:  __declared__var ==='+ __declared__var  );
}
//
//////////////////////////////////////////////////////////////////////////////

var __declared__var;

