/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-b-17.js
 * @description Array.prototype.reduce - properties added into own object are visited on an Array-like object
 */


function testcase() {

        var testResult = false;

        function callbackfn(accum, val, idx, obj) {
            if (idx === 3 && val === 3) {
                testResult = true;
            }
        }

        var obj = { length: 5 };

        Object.defineProperty(obj, "1", {
            get: function () {
                Object.defineProperty(obj, "3", {
                    get: function () {
                        return 3;
                    },
                    configurable: true
                });
                return 1;
            },
            configurable: true
        });

        Array.prototype.reduce.call(obj, callbackfn, "initialValue");
        return testResult;
    }
runTestCase(testcase);
