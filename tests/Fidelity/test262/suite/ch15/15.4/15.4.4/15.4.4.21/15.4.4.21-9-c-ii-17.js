/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-c-ii-17.js
 * @description Array.prototype.reduce - 'accumulator' used for current iteration is the result of previous iteration on an Array
 */


function testcase() {

        var result = true;
        var accessed = false;
        var preIteration = 1;
        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            if (preIteration !== prevVal) {
                result = false;
            }
            preIteration = curVal;
            return curVal;
        }

        [11, 12, 13].reduce(callbackfn, 1);
        return result && accessed;
    }
runTestCase(testcase);
