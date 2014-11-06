/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-i-27.js
 * @description Array.prototype.filter - This object is the Arguments object which implements its own property get method (number of arguments is greater than number of parameters)
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            if (idx === 0) {
                return val === 11;
            } else if (idx === 1) {
                return val === 12;
            } else if (idx === 2) {
                return val === 9;
            } else {
                return false;
            }
        }

        var func = function (a, b) {
            return Array.prototype.filter.call(arguments, callbackfn);
        };
        var newArr = func(11, 12, 9);

        return newArr.length === 3 && newArr[0] === 11 &&
            newArr[1] === 12 && newArr[2] === 9;
    }
runTestCase(testcase);
