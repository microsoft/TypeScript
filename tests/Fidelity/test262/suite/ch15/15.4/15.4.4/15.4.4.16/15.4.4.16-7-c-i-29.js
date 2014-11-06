/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-c-i-29.js
 * @description Array.prototype.every - element changed by getter on previous iterations is observed on an Array-like object
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return val > 10;
        }

        var preIterVisible = false;
        var obj = { length: 2 };

        Object.defineProperty(obj, "0", {
            get: function () {
                preIterVisible = true;
                return 11;
            },
            configurable: true
        });

        Object.defineProperty(obj, "1", {
            get: function () {
                if (preIterVisible) {
                    return 9;
                } else {
                    return 13;
                }
            },
            configurable: true
        });

        return !Array.prototype.every.call(obj, callbackfn);
    }
runTestCase(testcase);
