// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The initial value of Error.prototype.constructor is the built-in Error constructor
 *
 * @path ch15/15.11/15.11.4/S15.11.4.1_A1_T2.js
 * @description Checking if creating "new Error.prototype.constructor" passes and checking its properties
 */

constr = Error.prototype.constructor;

err = new constr;

//////////////////////////////////////////////////////////////////////////////
// CHECK#0
if (err === undefined) {
	$ERROR('#0: constr = Error.prototype.constructor; err = new constr; err === undefined');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#1
if (err.constructor !== Error) {
	$ERROR('#1: constr = Error.prototype.constructor; err = new constr; err.constructor === Error. Actual: '+err.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#2
if (!(Error.prototype.isPrototypeOf(err))) {
	$ERROR('#2: constr = Error.prototype.constructor; err = new constr; Error.prototype.isPrototypeOf(err) return true. Actual: '+Error.prototype.isPrototypeOf(err));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#3
Error.prototype.toString=Object.prototype.toString;
to_string_result = '[object '+ 'Error' +']';
if (err.toString() !== to_string_result) {
	$ERROR('#3: constr = Error.prototype.constructor; err = new constr; Error.prototype.toString=Object.prototype.toString; err.toString() === \'[object Error]\'. Actual: '+err.toString() );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#4
if (err.valueOf().toString() !== to_string_result) {
	$ERROR('#4: constr = Error.prototype.constructor; err = new constr; Error.prototype.toString=Object.prototype.toString; err.valueOf().toString() === \'[object Error]\'. Actual: '+err.valueOf().toString() );
}
//
//////////////////////////////////////////////////////////////////////////////

