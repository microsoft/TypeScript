/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-b-11.js
 * @description Array.prototype.map - deleting property of prototype causes prototype index property not to be visited on an Array
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return idx === 1 && typeof val === "undefined";
        }
        var arr = [0, , 2];

        Object.defineProperty(arr, "0", {
            get: function () {
                delete Array.prototype[1];
                return 0;
            },
            configurable: true
        });

        try {
            Array.prototype[1] = 1;
            var testResult = arr.map(callbackfn);
            return testResult.length === 3 && typeof testResult[1] === "undefined";
        } finally {
            delete Array.prototype[1];
        }
    }
runTestCase(testcase);
