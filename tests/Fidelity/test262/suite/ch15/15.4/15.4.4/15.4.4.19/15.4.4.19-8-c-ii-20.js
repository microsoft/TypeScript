/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-c-ii-20.js
 * @description Array.prototype.map - callbackfn called with correct parameters (thisArg is correct)
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            return this.threshold === 10;
        }

        var thisArg = { threshold: 10 };

        var obj = { 0: 11, 1: 9, length: 2 };

        var testResult = Array.prototype.map.call(obj, callbackfn, thisArg);

        return testResult[0] === true;
    }
runTestCase(testcase);
