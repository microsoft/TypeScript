/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.4/15.2.3.4-2-3.js
 * @description Object.getOwnPropertyNames - length of returned array is initialized to 0
 */


function testcase() {

        var obj = {};
        var result = Object.getOwnPropertyNames(obj);

        return result.length === 0;
    }
runTestCase(testcase);
