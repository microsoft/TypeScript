/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-b-14.js
 * @description Array.prototype.reduceRight - decreasing length of array in step 8 causes deleted index property not to be visited
 */


function testcase() {

        var accessed = false;
        var testResult = true;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            if (idx === 2) {
                testResult = false;
            }
        }

        var arr = [0, 1, 2, 3];

        Object.defineProperty(arr, "3", {
            get: function () {
                arr.length = 2;
                return 0;
            },
            configurable: true
        });

        arr.reduceRight(callbackfn);

        return testResult && accessed;
    }
runTestCase(testcase);
