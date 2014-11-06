/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-i-25.js
 * @description Array.prototype.filter - This object is the Arguments object which implements its own property get method (number of arguments is less than number of parameters)
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return val === 11 && idx === 0;
        }

        var func = function (a, b) {
            return Array.prototype.filter.call(arguments, callbackfn);
        };

        var newArr = func(11);

        return newArr.length === 1 && newArr[0] === 11;
    }
runTestCase(testcase);
