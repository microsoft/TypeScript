/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-9.js
 * @description Array.prototype.lastIndexOf - value of 'fromIndex' is a number (value is -0)
 */


function testcase() {

        return [0, true].lastIndexOf(true, -0) === -1 &&
            [true, 0].lastIndexOf(true, -0) === 0;
    }
runTestCase(testcase);
