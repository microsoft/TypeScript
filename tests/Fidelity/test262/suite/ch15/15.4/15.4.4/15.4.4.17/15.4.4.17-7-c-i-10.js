/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-7-c-i-10.js
 * @description Array.prototype.some - element to be retrieved is own accessor property on an Array
 */


function testcase() {

        var kValue = "abc";

        function callbackfn(val, idx, obj) {
            if (idx === 10) {
                return val === kValue;
            }
            return false;
        }

        var arr = [];

        Object.defineProperty(arr, "10", {
            get: function () {
                return kValue;
            },
            configurable: true
        });

        return arr.some(callbackfn);
    }
runTestCase(testcase);
