/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.10/15.2.3.10-3-1.js
 * @description Object.preventExtensions - Object.isExtensible(arg) returns false if arg is the returned object
 */


function testcase() {
        var obj = {};
        var preCheck = Object.isExtensible(obj);
        Object.preventExtensions(obj);

        return preCheck && !Object.isExtensible(obj);
    }
runTestCase(testcase);
