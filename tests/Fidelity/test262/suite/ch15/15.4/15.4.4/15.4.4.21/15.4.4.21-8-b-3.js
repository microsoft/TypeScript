/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-8-b-3.js
 * @description Array.prototype.reduce - loop is broken once 'kPresent' is true
 */


function testcase() {

        var called = 0;
        var testResult = false;
        var firstCalled = 0;
        var secondCalled = 0;

        function callbackfn(prevVal, val, idx, obj) {
            if (called === 0) {
                testResult = (idx === 1);
            }
            called++;
        }

        var arr = [, , ];

        Object.defineProperty(arr, "0", {
            get: function () {
                firstCalled++;
                return 11;
            },
            configurable: true
        });

        Object.defineProperty(arr, "1", {
            get: function () {
                secondCalled++;
                return 9;
            },
            configurable: true
        });

        arr.reduce(callbackfn);
        return testResult && firstCalled === 1 && secondCalled === 1;
    }
runTestCase(testcase);
