/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-c-ii-4.js
 * @description Array.prototype.reduce - k values are passed in acending numeric order on an Array
 */


function testcase() {

        var arr = [0, 1, 2];
        var lastIdx = 0;
        var result = true;
        var accessed = false;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            if (lastIdx !== idx) {
                result = false;
            } else {
                lastIdx++;
            }
        }

        arr.reduce(callbackfn, 11);
        return result && accessed;
    }
runTestCase(testcase);
