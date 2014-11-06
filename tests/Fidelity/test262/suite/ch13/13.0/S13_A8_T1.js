// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Arguments property of activation object contains real params to be passed
 *
 * @path ch13/13.0/S13_A8_T1.js
 * @description Creating a function declared with "function __func(param1, param2, param3)" and using arguments.length property in order to perform the test
 */

 function __func(param1, param2, param3) {
 	return arguments.length;
 }
 
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func('A') !== 1) {
 	$ERROR('#1: __func(\'A\') === 1. Actual: __func(\'A\') ==='+__func('A'));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__func('A', 'B', 1, 2,__func) !== 5) {
	$ERROR('#2: __func(\'A\', \'B\', 1, 2,__func) === 5. Actual: __func(\'A\', \'B\', 1, 2,__func) ==='+__func('A', 'B', 1, 2,__func));
}
//
//////////////////////////////////////////////////////////////////////////////
 
 
 

