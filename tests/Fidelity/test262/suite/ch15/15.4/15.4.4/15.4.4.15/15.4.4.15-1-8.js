/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-1-8.js
 * @description Array.prototype.lastIndexOf applied to String object
 */


function testcase() {

        var obj = new String("undefined");

        return Array.prototype.lastIndexOf.call(obj, "f") === 4;
    }
runTestCase(testcase);
