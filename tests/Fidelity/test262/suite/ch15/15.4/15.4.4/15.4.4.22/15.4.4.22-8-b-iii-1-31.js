/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-8-b-iii-1-31.js
 * @description Array.prototype.reduceRight - element changed by getter on current iteration is observed subsequetly on an Array-like object
 */


function testcase() {
        var testResult = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 1) {
                testResult = (prevVal === 2 && curVal === 1);
            }
        }

        var obj = { 0: 0, length: 3 };
        var preIterVisible = false;

        Object.defineProperty(obj, "1", {
            get: function () {
                if (preIterVisible) {
                    return 1;
                } else {
                    return "20";
                }
            },
            configurable: true
        });

        Object.defineProperty(obj, "2", {
            get: function () {
                preIterVisible = true;
                return 2;
            },
            configurable: true
        });

        Array.prototype.reduceRight.call(obj, callbackfn);
        return testResult;
    }
runTestCase(testcase);
