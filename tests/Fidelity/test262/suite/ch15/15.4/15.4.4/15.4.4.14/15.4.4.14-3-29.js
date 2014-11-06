/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-3-29.js
 * @description Array.prototype.indexOf - value of 'length' is boundary value (2^32 + 1)
 */


function testcase() {
        var targetObj = {};
        var obj = {
            0: targetObj,
            1: 4294967297,
            length: 4294967297
        };

        return Array.prototype.indexOf.call(obj, targetObj) === 0 &&
            Array.prototype.indexOf.call(obj, 4294967297) === -1;
    }
runTestCase(testcase);
