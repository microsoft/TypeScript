// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Construct]] property for a Function object F is called:
 * A new native ECMAScript object is created.
 * Invoke the [[Call]] property of F, providing native ECMAScript object just created as the this value and
 * providing the argument list passed into [[Construct]] as the argument values
 *
 * @path ch13/13.2/S13.2.2_A5_T2.js
 * @description Declaring a function with "__FACTORY = function(arg1, arg2)"
 */

__VOLUME=8;
__RED="red";
__ID=12342;
__TOP=1.1;
__BOTTOM=0.0;
__LEFT=0.0;


__FACTORY = function(arg1, arg2){
	this.volume=__VOLUME;
	color=__RED;
	this.id=arg1;
	top=arg2;
	this.bottom=arguments[3];
	left=arguments[4];
};

__device = new __FACTORY(__ID, __TOP, __BOTTOM, __LEFT);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__device.color !== undefined) {
	$ERROR('#1: __device.color === undefined. Actual: __device.color ==='+__device.color);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__device.volume !== __VOLUME) {
	$ERROR('#2: __device.volume === __VOLUME. Actual: __device.volume ==='+__device.volume);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__device.top !== undefined) {
	$ERROR('#3: __device.top === undefined. Actual: __device.top ==='+__device.top);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__device.id !== __ID) {
	$ERROR('#4: __device.id === __ID. Actual: __device.id ==='+__device.id);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#5
if (__device.left !== undefined) {
	$ERROR('#5: __device.left === undefined. Actual: __device.left ==='+__device.left);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#6
if (__device.bottom !== __BOTTOM) {
	$ERROR('#6: __device.bottom === __BOTTOM. Actual: __device.bottom ==='+__device.bottom);
}
//
//////////////////////////////////////////////////////////////////////////////

