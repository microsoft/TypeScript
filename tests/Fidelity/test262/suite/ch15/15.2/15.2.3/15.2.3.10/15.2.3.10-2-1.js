/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.10/15.2.3.10-2-1.js
 * @description Object.preventExtensions - repeated calls to preventExtensions have no side effects
 */


function testcase() {
        var obj = {};
        var testResult1 = true;
        var testResult2 = true;

        var preCheck = Object.isExtensible(obj);

        Object.preventExtensions(obj);
        testResult1 = Object.isExtensible(obj);
        Object.preventExtensions(obj);
        testResult2 = Object.isExtensible(obj);

        return preCheck && !testResult1 && !testResult2;

    }
runTestCase(testcase);
