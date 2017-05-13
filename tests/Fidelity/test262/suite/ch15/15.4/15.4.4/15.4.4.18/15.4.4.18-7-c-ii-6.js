/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-ii-6.js
 * @description Array.prototype.forEach - arguments to callbackfn are self consistent
 */


function testcase() {

        var result = false;
        var obj = { 0: 11, length: 1 };
        var thisArg = {};

        function callbackfn() {
            result = (this === thisArg &&
                arguments[0] === 11 &&
                arguments[1] === 0 &&
                arguments[2] === obj);
        }

        Array.prototype.forEach.call(obj, callbackfn, thisArg);
        return result;
    }
runTestCase(testcase);
