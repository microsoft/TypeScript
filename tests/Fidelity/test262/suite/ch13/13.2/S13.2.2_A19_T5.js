// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function's scope chain is started when it is declared
 *
 * @path ch13/13.2/S13.2.2_A19_T5.js
 * @description Function is declared in the object scope, then an exception is thrown and the object is deleted
 */

var a = 1;

var __obj = {a:2};

with (__obj)
{
    try {
        
    	var __func = function()
        {
            return a;
        }
        throw 3;
    } catch (e) {
    	;
    }
}

delete __obj;

result = __func();

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (result !== 2) {
	$ERROR('#1: result === 2. Actual: result ==='+result);
}
//
//////////////////////////////////////////////////////////////////////////////

