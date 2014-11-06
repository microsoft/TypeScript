// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production ReturnStatement : return Expression; is evaluated as:
 * i)   Evaluate Expression.
 * ii)  Call GetValue(Result(2)).
 * iii) Return (return, Result(3), empty)
 *
 * @path ch12/12.9/S12.9_A4.js
 * @description Return very sophisticated expression and function
 */

// second derivative 
function DD_operator(f, delta){return function(x){return (f(x+delta)-2*f(x)+f(x-delta))/(delta*delta)};}

DDsin = DD_operator(Math.sin, 0.00001);


//////////////////////////////////////////////////////////////////////////////
//CHECK#1
// ((sin(x))')' = -sin(x)
if (DDsin( Math.PI/2 ) + Math.sin( Math.PI/2 ) > 0.00001) {
	$ERROR('#1: return Expression yields to Return (return, GetValue(Evaluate Expression), empty)');
}
//
//////////////////////////////////////////////////////////////////////////////

