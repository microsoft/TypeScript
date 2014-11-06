/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-b-3.js
 * @description Array.prototype.map - deleted properties in step 2 are visible here
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            if (idx === 2) {
                return false;
            } else {
                return true;
            }
        }
        var obj = { 2: 6.99, 8: 19 };

        Object.defineProperty(obj, "length", {
            get: function () {
                delete obj[2];
                return 10;
            },
            configurable: true
        });

        var testResult = Array.prototype.map.call(obj, callbackfn);
        return typeof testResult[2] === "undefined";
    }
runTestCase(testcase);
