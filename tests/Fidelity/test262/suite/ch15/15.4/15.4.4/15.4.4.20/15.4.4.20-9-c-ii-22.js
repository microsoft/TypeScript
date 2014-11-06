/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-ii-22.js
 * @description Array.prototype.filter - callbackfn called with correct parameters (the index k is correct)
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            if (val === 11) {
                return idx === 0;
            }

            if (val === 12) {
                return idx === 1;
            }

            return false;
        }

        var obj = { 0: 11, 1: 12, length: 2 };
        var newArr = Array.prototype.filter.call(obj, callbackfn);

        return newArr.length === 2 && newArr[0] === 11 && newArr[1] === 12;
    }
runTestCase(testcase);
