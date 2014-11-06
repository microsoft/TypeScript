/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-2-7.js
 * @description Array.prototype.map - applied to Array-like object, 'length' is an own accessor property
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return val > 10;
        }

        var obj = {};

        Object.defineProperty(obj, "length", {
            get: function () {
                return 2;
            },
            configurable: true
        });

        obj[0] = 12;
        obj[1] = 11;
        obj[2] = 9;

        var testResult = Array.prototype.map.call(obj, callbackfn);

        return testResult.length === 2;
    }
runTestCase(testcase);
