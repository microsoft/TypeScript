/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-b-10.js
 * @description Array.prototype.map - deleting property of prototype causes prototype index property not to be visited on an Array-like Object
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return idx === 1 && typeof val === "undefined";
        }
        var obj = { 2: 2, length: 20 };

        Object.defineProperty(obj, "0", {
            get: function () {
                delete Object.prototype[1];
                return 0;
            },
            configurable: true
        });

        try {
            Object.prototype[1] = 1;
            var testResult = Array.prototype.map.call(obj, callbackfn);
            return testResult.length === 20 && typeof testResult[1] === "undefined";
        } finally {
            delete Object.prototype[1];
        }
    }
runTestCase(testcase);
