/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.3/15.2.3.3-2-20.js
 * @description Object.getOwnPropertyDescriptor - argument 'P' is a number that converts to string (value is 1e+21)
 */


function testcase() {
        var obj = { "1e+21": 1 };

        var desc = Object.getOwnPropertyDescriptor(obj, 1e+21);

        return desc.value === 1;
    }
runTestCase(testcase);
