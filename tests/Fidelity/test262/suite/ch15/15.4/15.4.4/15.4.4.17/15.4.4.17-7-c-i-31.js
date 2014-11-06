/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-7-c-i-31.js
 * @description Array.prototype.some - unhandled exceptions happened in getter terminate iteration on an Array
 */


function testcase() {

        var accessed = false;
        function callbackfn(val, idx, obj) {
            if (idx > 0) {
                accessed = true;
            }
            return true;
        }

        var arr = [];
        arr[10] = 100;
        Object.defineProperty(arr, "0", {
            get: function () {
                throw new RangeError("unhandle exception happened in getter");
            },
            configurable: true
        });

        try {
            arr.some(callbackfn);
            return false;
        } catch (ex) {
            return ex instanceof RangeError && !accessed;
        }
    }
runTestCase(testcase);
