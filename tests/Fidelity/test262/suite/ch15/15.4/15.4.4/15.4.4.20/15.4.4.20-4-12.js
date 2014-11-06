/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-4-12.js
 * @description Array.prototype.filter - 'callbackfn' is a function
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            if (idx === 1) {
                return val === 9;
            }
            return false;
        }

        var newArr = [11, 9].filter(callbackfn);
        return newArr.length === 1 && newArr[0] === 9;
    }
runTestCase(testcase);
