/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-b-17.js
 * @description Array.prototype.reduceRight - properties added into own object are visited on an Array-like object
 */


function testcase() {

        var testResult = false;

        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 0 && curVal === 0) {
                testResult = true;
            }
        }

        var obj = { length: 2 };

        Object.defineProperty(obj, "1", {
            get: function () {
                Object.defineProperty(obj, "0", {
                    get: function () {
                        return 0;
                    },
                    configurable: true
                });
                return 1;
            },
            configurable: true
        });

        Array.prototype.reduceRight.call(obj, callbackfn, "initialValue");
        return testResult;
    }
runTestCase(testcase);
