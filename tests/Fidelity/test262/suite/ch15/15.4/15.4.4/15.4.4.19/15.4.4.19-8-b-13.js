/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-b-13.js
 * @description Array.prototype.map - deleting own property with prototype property causes prototype index property to be visited on an Array
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            if (idx === 1 && val === 3) {
                return false;
            } else {
                return true;
            }
        }
        var arr = [0, 1, 2];

        Object.defineProperty(arr, "0", {
            get: function () {
                delete arr[1];
                return 0;
            },
            configurable: true
        });

        try {
            Array.prototype[1] = 3;
            var testResult = arr.map(callbackfn);
            return testResult[1] === false;
        } finally {
            delete Array.prototype[1];
        }
    }
runTestCase(testcase);
