/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-5-a-4.js
 * @description Object.keys - Verify that 'configurable' attribute of element of returned array is correct
 */


function testcase() {
        var obj = { prop1: 100 };

        var array = Object.keys(obj);
        var desc = Object.getOwnPropertyDescriptor(array, "0");

        delete array[0];

        return typeof array[0] === "undefined" && desc.hasOwnProperty("configurable") && desc.configurable === true;
    }
runTestCase(testcase);
