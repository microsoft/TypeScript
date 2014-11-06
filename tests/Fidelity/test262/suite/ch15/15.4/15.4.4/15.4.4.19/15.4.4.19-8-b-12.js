/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-b-12.js
 * @description Array.prototype.map - deleting own property with prototype property causes prototype index property to be visited on an Array-like object
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            if (idx === 1 && val === 3) {
                return false;
            } else {
                return true;
            }
        }
        var obj = { 0: 0, 1: 1, 2: 2, length: 10 };

        Object.defineProperty(obj, "0", {
            get: function () {
                delete obj[1];
                return 0;
            },
            configurable: true
        });

        try {
            Object.prototype[1] = 3;
            var testResult = Array.prototype.map.call(obj, callbackfn);
            return testResult[1] === false; 
        } finally {
            delete Object.prototype[1];
        }
    }
runTestCase(testcase);
