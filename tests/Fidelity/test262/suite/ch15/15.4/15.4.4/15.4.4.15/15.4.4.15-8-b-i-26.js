/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-i-26.js
 * @description Array.prototype.lastIndexOf applied to Arguments object which implements its own property get method (number of arguments equals to number of parameters)
 */


function testcase() {

        var func = function (a, b) {
            return 0 === Array.prototype.lastIndexOf.call(arguments, arguments[0]) &&
                1 === Array.prototype.lastIndexOf.call(arguments, arguments[1]) &&
                -1 === Array.prototype.lastIndexOf.call(arguments, arguments[2]);
        };

        return func(0, true);
    }
runTestCase(testcase);
