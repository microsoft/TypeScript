/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-c-ii-16.js
 * @description Array.prototype.reduce - non-indexed properties are not called
 */


function testcase() {

        var accessed = false;
        var result1 = true;
        var result2 = true;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            if (curVal === 8) {
                result1 = false;
            }

            if (prevVal === 8) {
                result2 = false;
            }
        }

        var obj = { 0: 11, 10: 12, non_index_property: 8, length: 20 };

        Array.prototype.reduce.call(obj, callbackfn, 1);
        return result1 && result2 && accessed;
    }
runTestCase(testcase);
