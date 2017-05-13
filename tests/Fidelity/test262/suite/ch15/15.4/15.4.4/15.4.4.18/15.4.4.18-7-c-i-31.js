/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-i-31.js
 * @description Array.prototype.forEach - unnhandled exceptions happened in getter terminate iteration on an Array-like object
 */


function testcase() {

        var accessed = false;

        function callbackfn(val, idx, obj) {
            if (idx > 1) {
                accessed = true;
            }
        }

        var arr = [];
        arr[5] = 10;
        arr[10] = 100;

        Object.defineProperty(arr, "1", {
            get: function () {
                throw new RangeError("unhandle exception happened in getter");
            },
            configurable: true
        });

        Object.defineProperty(arr, "2", {
            get: function () {
                accessed = true;
                return 100;
            },
            configurable: true
        });

        try {
            arr.forEach(callbackfn);
            return false;
        } catch (ex) {
            return (ex instanceof RangeError) && !accessed;
        }
    }
runTestCase(testcase);
