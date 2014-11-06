/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-b-10.js
 * @description Array.prototype.reduce - deleting property of prototype in step 8 causes deleted index property not to be visited on an Array-like Object
 */


function testcase() {

        var accessed = false;
        var testResult = true;

        function callbackfn(accum, val, idx, obj) {
            accessed = true;
            if (idx === 3) {
                testResult = false;
            }
        }

        var obj = { 2: 2, length: 20 };

        Object.defineProperty(obj, "0", {
            get: function () {
                delete Object.prototype[3];
                return 0;
            },
            configurable: true
        });

        try {
            Object.prototype[3] = 1;
            Array.prototype.reduce.call(obj, callbackfn);
            return testResult && accessed;
        } finally {
            delete Object.prototype[3];
        }
    }
runTestCase(testcase);
