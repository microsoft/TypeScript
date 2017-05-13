/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-2.js
 * @description Array.prototype.lastIndexOf return -1 when value of 'length' is a boolean (value is true)
 */


function testcase() {
        var obj = { 0: 0, 1: 1, length: true };
        return Array.prototype.lastIndexOf.call(obj, 0) === 0 &&
            Array.prototype.lastIndexOf.call(obj, 1) === -1;
    }
runTestCase(testcase);
