// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Construct]] property for a Function object F is called:
 * A new native ECMAScript object is created.
 * Invoke the [[Call]] property of F, providing just created native ECMAScript object as the this value and providing the argument
 * list passed into [[Construct]] as the argument values.
 * If Type( [[Call]] returned) is an Function then return this just as obtained function
 *
 * @path ch13/13.2/S13.2.2_A8_T2.js
 * @description Creating a function whose prototype contains declaration of another function declared as a variable
 */

var __FRST="one";
var __SCND="two";

var __func = function(arg1, arg2){
	this.first=arg1;
	var __gunc = function(arg){return arg+="BA"};
	__gunc.prop=arg2;
    return __gunc;
	
};

var __instance = new __func(__FRST, __SCND);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.first !== undefined) {
	$ERROR('#1: __instance.first === undefined. Actual: __instance.first ==='+__instance.first);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__instance.prop!==__SCND) {
	$ERROR('#2: __instance.prop === __SCND. Actual: __instance.prop ==='+__instance.prop);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__instance("SAM")!== "SAMBA") {
	$ERROR('#2: __instance("SAM") === "SAMBA". Actual: __instance("SAM") ==='+__instance("SAM"));
}
//
//////////////////////////////////////////////////////////////////////////////


