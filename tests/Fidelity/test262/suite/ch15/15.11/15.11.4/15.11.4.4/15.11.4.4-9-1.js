/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.11/15.11.4/15.11.4.4/15.11.4.4-9-1.js
 * @description Error.prototype.toString return 'name' when 'name' is non-empty string and 'msg' is empty string
 */


function testcase() {
        var errObj = new Error();
        errObj.name = "ErrorName";
        return errObj.toString() === "ErrorName";
    }
runTestCase(testcase);
