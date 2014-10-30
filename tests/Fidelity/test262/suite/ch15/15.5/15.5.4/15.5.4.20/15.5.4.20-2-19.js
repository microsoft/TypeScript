/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-2-19.js
 * @description String.prototype.trim - argument argument 'this' is a number that converts to a string (value is 0.0000001)
 */


function testcase() {
        return String.prototype.trim.call(0.0000001) === "1e-7";
    }
runTestCase(testcase);
