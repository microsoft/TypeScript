/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-2-2.js
 * @description Array.prototype.map - when 'length' is own data property on an Array
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return val > 10;
        }

        var testResult = [12, 11].map(callbackfn);
        return testResult.length === 2;
    }
runTestCase(testcase);
