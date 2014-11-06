// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Call]] property for a Function object F is called, the following steps are taken:
 * 2. Evaluate F's FunctionBody;
 * if Result.type is thrown then Result.value is thrown too
 *
 * @path ch13/13.2/S13.2.1_A8_T2.js
 * @description Throwing an exception within a function body. Declaring function with "var __func = function (message)"
 */

var CATCH_ME_IF_YOU_CAN = true;

var __func = function (message){
    var x = 1;
    throw (message)
    return x;
}

try{
    var x=__func(CATCH_ME_IF_YOU_CAN)
    $ERROR('#0: var x=__func(CATCH_ME_IF_YOU_CAN) lead to throwing exception');
} catch(e){
    if (!e) {
    	$ERROR('#1: Exception === true. Actual: exception ==='+e);
    }
}

