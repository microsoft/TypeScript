// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function's scope chain is started when it is declared
 *
 * @path ch13/13.2/S13.2.2_A19_T4.js
 * @description Function is declared in the hierarchical object scope and then an exception is thrown
 */

var a = 1;

var __obj = {a:2,__obj:{a:3}};

try {
	with (__obj)
    {
        with(__obj){
            var __func = function(){return a;};
            throw 5;
        }
    }
} catch (e) {
	;
}

result = __func();

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (result !== 3) {
	$ERROR('#1: result === 3. Actual: result ==='+result);
}
//
//////////////////////////////////////////////////////////////////////////////




