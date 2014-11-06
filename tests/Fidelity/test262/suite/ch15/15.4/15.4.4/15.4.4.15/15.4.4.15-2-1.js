/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-2-1.js
 * @description Array.prototype.lastIndexOf - 'length' is own data property on an Array-like object
 */


function testcase() {
        var obj = { 1: null, 2: undefined, length: 2 };

        return Array.prototype.lastIndexOf.call(obj, null) === 1 &&
            Array.prototype.lastIndexOf.call(obj, undefined) === -1;
    }
runTestCase(testcase);
