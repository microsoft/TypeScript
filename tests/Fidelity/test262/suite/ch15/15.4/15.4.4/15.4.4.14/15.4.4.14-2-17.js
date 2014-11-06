/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-2-17.js
 * @description Array.prototype.indexOf applied to Arguments object which implements its own property get method
 */


function testcase() {

        var func = function (a, b) {
            arguments[2] = false;
            return Array.prototype.indexOf.call(arguments, true) === 1 &&
                Array.prototype.indexOf.call(arguments, false) === -1;
        };

        return func(0, true);
    }
runTestCase(testcase);
