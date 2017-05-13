/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-b-3.js
 * @description Array.prototype.every - deleted properties in step 2 are visible here
 */


function testcase() {
        var accessed = false;
        function callbackfn(val, idx, obj) {
            accessed = true;
            return idx !== 2;
        }
        var arr = { 2: 6.99, 8: 19};

        Object.defineProperty(arr, "length", {
            get: function () {
                delete arr[2];
                return 10;
            },
            configurable: true
        });

        return Array.prototype.every.call(arr, callbackfn) && accessed;
    }
runTestCase(testcase);
