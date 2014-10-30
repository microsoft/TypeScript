/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.

/**
 * @path ch15/15.3/15.3.4/15.3.4.5/15.3.4.5-2-16.js
 * @description Function.prototype.bind - 'Target' is a function
 */


function testcase() {
        function testFunc() {}
        try {
            testFunc.bind();
            return true;
        } catch (e) {
            return false;
        }
    }
runTestCase(testcase);
