/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-ii-22.js
 * @description Array.prototype.forEach - callbackfn called with correct parameters (the index k is correct)
 */


function testcase() {

        var resultOne = false;
        var resultTwo = false;

        function callbackfn(val, idx, obj) {
            if (val === 11) {
                resultOne = (idx === 0);
            }

            if (val === 12) {
                resultTwo = (idx === 1);
            }

        }

        var obj = { 0: 11, 1: 12, length: 2 };

        Array.prototype.forEach.call(obj, callbackfn);
        return resultOne && resultTwo;
    }
runTestCase(testcase);
