// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Call]] property for a Function object F is called, the following steps are taken:
 * 2. Evaluate F's FunctionBody;
 * if Result.type is thrown then Result.value is thrown too
 *
 * @path ch13/13.2/S13.2.1_A8_T1.js
 * @description Throwing an exception within a function body. Declaring function with "function __func()"
 */

function __func(){
    var x = 1;
    throw ("Catch Me If You Can")
    return x;
}

try{
    var x=__func()
    $ERROR('#0: var x=__func() lead to throwing exception');
} catch(e){
    if (e !== "Catch Me If You Can") {
    	$ERROR('#1: Exception === "Catch Me If You Can". Actual: exception ==='+e);
    }
}

