/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-7-c-i-25.js
 * @description Array.prototype.some - This object is the Arguments object which implements its own property get method (number of arguments is less than number of parameters)
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            if (idx === 0) {
                return val === 11;
            }
            return false;
        }

        var func = function (a, b) {
            return Array.prototype.some.call(arguments, callbackfn);
        };

        return func(11);
    }
runTestCase(testcase);
