/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-c-ii-6.js
 * @description Array.prototype.every - arguments to callbackfn are self consistent
 */


function testcase() {

        var accessed = false;
        var thisArg = {};
        var obj = { 0: 11, length: 1 };

        function callbackfn() {
            accessed = true;
            return this === thisArg &&
                arguments[0] === 11 &&
                arguments[1] === 0 &&
                arguments[2] === obj;
        }

        return Array.prototype.every.call(obj, callbackfn, thisArg) && accessed;
    }
runTestCase(testcase);
