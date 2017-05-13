/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-2-35.js
 * @description String.prototype.trim - 'this' is a String Object that converts to a string
 */


function testcase() {
        return (String.prototype.trim.call(new String("abc")) === "abc");
    }
runTestCase(testcase);
