/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-b-12.js
 * @description Array.prototype.reduceRight - deleting own property with prototype property in step 8 causes prototype index property to be visited on an Array-like object
 */


function testcase() {

        var testResult = false;

        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 1 && curVal === 1) {
                testResult = true;
            }
        }

        var obj = { 0: 0, 1: 111, length: 10 };

        Object.defineProperty(obj, "4", {
            get: function () {
                delete obj[1];
                return 0;
            },
            configurable: true
        });

        try {
            Object.prototype[1] = 1;
            Array.prototype.reduceRight.call(obj, callbackfn);
            return testResult;
        } finally {
            delete Object.prototype[1];
        }
    }
runTestCase(testcase);
