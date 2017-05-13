// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Construct]] property for a Function object F is called:
 * A new native ECMAScript object is created.
 * Invoke the [[Call]] property of F, providing just created native ECMAScript object as the this value and providing the argument
 * list passed into [[Construct]] as the argument values.
 * If Type( [[Call]] returned) is not Object then return passed as this into [[Call]] object
 *
 * @path ch13/13.2/S13.2.2_A6_T2.js
 * @description Declaring a function with "function __func (arg)"
 */

var __FOO="fooValue";
var __BAR="barValue";

function __func (arg){
	this.foo=arg;
    return true;
	this.bar=arguments[1];
};

var __obj = new __func(__FOO, __BAR);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.foo!==__FOO) {
	$ERROR('#1: __obj.foo === __FOO. Actual: __obj.foo==='+__obj.foo);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__obj.bar!==undefined) {
	$ERROR('#2: __obj.bar === undefined. Actual: __obj.bar==='+__obj.bar);
}
//
//////////////////////////////////////////////////////////////////////////////

