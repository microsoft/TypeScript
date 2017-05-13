// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Construct]] property for a Function object F is called,
 * and the object created in the function is returned, the object (declared with "this" within a function) will be strong and healthy
 *
 * @path ch13/13.2/S13.2.2_A15_T4.js
 * @description Function declared at the end of the program and "obj" property is declared with "obj = {}"
 */

__FACTORY = function(){
    this.prop = 1;
    obj = {};
    obj.prop = "A";
    obj.slot = this;
    return obj;
}

__obj = new __FACTORY();

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (obj.prop !== "A") {
	$ERROR('#1: obj.prop === "A". Actual: obj.prop ==='+obj.prop);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__obj.prop !== "A") {
	$ERROR('#2: __obj.prop === "A". Actual: __obj.prop ==='+obj.prop);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__obj.slot.prop !==1) {
	$ERROR('#3: __obj.slot.prop ===1. Actual: __obj.slot.prop ==='+obj.slot.prop);
}
//
//////////////////////////////////////////////////////////////////////////////


