/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-b-23.js
 * @description Array.prototype.reduceRight - deleting property of prototype causes deleted index property not to be visited on an Array-like Object
 */


function testcase() {

        var accessed = false;
        var testResult = true;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            if (idx === 3) {
                testResult = false;
            }
        }

        var obj = { 2: 2, length: 20 };

        Object.defineProperty(obj, "5", {
            get: function () {
                delete Object.prototype[3];
                return 0;
            },
            configurable: true
        });

        try {
            Object.prototype[3] = 1;
            Array.prototype.reduceRight.call(obj, callbackfn, "initialValue");
            return testResult && accessed;
        } finally {
            delete Object.prototype[3];
        }
    }
runTestCase(testcase);
