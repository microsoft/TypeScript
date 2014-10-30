// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Construct]] property for a Function object F is called:
 * A new native ECMAScript object is created.
 * Gets the value of the [[Prototype]] property of the F(Denote it PROTO_VAL).
 * If PROTO_VAL is an object, sets the [[Prototype]] property of native ECMAScript object just created
 * to the PROTO_VAL
 *
 * @path ch13/13.2/S13.2.2_A4_T1.js
 * @description Declaring a function with "function __FACTORY()"
 */

var __CUBE="cube";

function __FACTORY(){
};
__FACTORY.prototype={ shape:__CUBE, printShape:function(){return this.shape;} };

var __device = new __FACTORY();

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__device.printShape === undefined) {
	$ERROR('#1: __device.printShape !== undefined. Actual: __device.printShape ==='+__device.printShape);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__device.printShape() !== __CUBE) {
	$ERROR('#2: __device.printShape() === __CUBE. Actual: __device.printShape() ==='+__device.printShape());
}
//
//////////////////////////////////////////////////////////////////////////////

