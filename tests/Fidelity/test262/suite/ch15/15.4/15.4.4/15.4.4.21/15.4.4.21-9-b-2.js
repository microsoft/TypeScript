/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-b-2.js
 * @description Array.prototype.reduce - added properties in step 2 are visible here
 */


function testcase() {

        var testResult = false;

        function callbackfn(accum, val, idx, obj) {
            if (idx === 2 && val === "2") {
                testResult = true;
            }
        }

        var obj = {};

        Object.defineProperty(obj, "length", {
            get: function () {
                obj[2] = "2";
                return 3;
            },
            configurable: true
        });

        Array.prototype.reduce.call(obj, callbackfn, "initialValue");

        return testResult;
    }
runTestCase(testcase);
