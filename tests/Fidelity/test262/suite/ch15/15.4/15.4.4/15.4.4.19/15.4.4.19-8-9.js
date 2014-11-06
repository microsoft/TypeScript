/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-9.js
 * @description Array.prototype.map - modifications to length don't change number of iterations on an Array
 */


function testcase() {
        var called = 0;
        function callbackfn(val, idx, obj) {
            called += 1;
            return val > 10;
        }

        var arr = [9, , 12];

        Object.defineProperty(arr, "1", {
            get: function () {
                arr.length = 2;
                return 8;
            },
            configurable: true
        });

        var testResult = arr.map(callbackfn);

        return testResult.length === 3 && called === 2 && typeof testResult[2] === "undefined";
    }
runTestCase(testcase);
