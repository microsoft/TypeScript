// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A1_T13.js
 * @description Arguments are objects, and instance is string.
 * First object have overrided valueOf and toString functions.
 * Second object have overrided toString function, that return exception
 */

var __obj = {valueOf:function(){return {};}, toString:function(){return 1;}};
var __obj2 = {toString:function(){throw "inend";}};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
    var x = "ABB\u0041BABAB\u0031BBAA".substring(__obj, __obj2);
    $FAIL('#1: var x = "ABB\\u0041BABAB\\u0031BBAA".substring(__obj,__obj2) lead to throw exception');
} catch (e) {
    if (e!=="inend") {
        $ERROR('#1.1: Exception === "inend". Actual: '+e);
    }
}
//
//////////////////////////////////////////////////////////////////////////////


