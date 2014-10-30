/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-i-1.js
 * @description Array.prototype.lastIndexOf - element to be retrieved is own data property on an Array-like object
 */


function testcase() {

        var obj = { 0: 0, 1: 1, 2: 2, length: 3 };

        return Array.prototype.lastIndexOf.call(obj, 0) === 0 &&
            Array.prototype.lastIndexOf.call(obj, 1) === 1 &&
            Array.prototype.lastIndexOf.call(obj, 2) === 2;
    }
runTestCase(testcase);
