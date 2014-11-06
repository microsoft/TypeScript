/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-9-5.js
 * @description Array.prototype.map - empty array to be returned if 'length' is 0 (empty array)
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            return val > 10;
        }

        var obj = { 0: 9, 1: 8, length: 0 };

        var testResult = Array.prototype.map.call(obj, callbackfn);

        return testResult.length === 0;
    }
runTestCase(testcase);
