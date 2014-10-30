/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-3-2.js
 * @description Array.prototype.forEach - value of 'length' is a boolean (value is true)
 */


function testcase() {

        var testResult = false;
        function callbackfn(val, idx, obj) {
            testResult = (val > 10);
        }

        var obj = { 0: 11, 1: 9, length: true };

        Array.prototype.forEach.call(obj, callbackfn);

        return testResult;
    }
runTestCase(testcase);
