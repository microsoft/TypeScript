/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-3-2.js
 * @description Array.prototype.indexOf return -1 when 'length' is a boolean (value is true)
 */


function testcase() {
        var obj = { 0: 0, 1: 1, length: true };
        return Array.prototype.indexOf.call(obj, 0) === 0 &&
            Array.prototype.indexOf.call(obj, 1) === -1;
    }
runTestCase(testcase);
