/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-2-32.js
 * @description String.prototype.trim - argument 'this' is a string(value is '123#$%abc')
 */


function testcase() {
        return String.prototype.trim.call("123#$%abc") === "123#$%abc";
    }
runTestCase(testcase);
