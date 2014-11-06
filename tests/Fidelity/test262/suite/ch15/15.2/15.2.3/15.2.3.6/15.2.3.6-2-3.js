/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-2-3.js
 * @description Object.defineProperty - argument 'P' is a boolean whose value is false
 */


function testcase() {
        var obj = {};
        Object.defineProperty(obj, false, {});

        return obj.hasOwnProperty("false");

    }
runTestCase(testcase);
