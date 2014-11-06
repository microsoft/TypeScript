/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-7-b-14.js
 * @description Array.prototype.some - decreasing length of array causes index property not to be visited
 */


function testcase() {
        var accessed = false;
        function callbackfn(val, idx, obj) {
            accessed = true;
            return idx === 3;
        }
        var arr = [0, 1, 2, "last"];

        Object.defineProperty(arr, "0", {
            get: function () {
                arr.length = 3;
                return 0;
            },
            configurable: true
        });

        return !arr.some(callbackfn) && accessed;
    }
runTestCase(testcase);
