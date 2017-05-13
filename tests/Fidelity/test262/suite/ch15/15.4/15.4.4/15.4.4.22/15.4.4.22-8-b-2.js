/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-8-b-2.js
 * @description Array.prototype.reduceRight - modifications to length don't change number of iterations in step 9
 */


function testcase() {
        var called = 0;
        function callbackfn(prevVal, curVal, idx, obj) {
            called++;
            return prevVal + curVal;
        }

        var arr = [0, 1, 2, 3];
        Object.defineProperty(arr, "4", {
            get: function () {
                arr.length = 2;
                return 10;
            },
            configurable: true
        });

        var preVal = arr.reduceRight(callbackfn);

        return preVal === 11 && called === 2;
    }
runTestCase(testcase);
