/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-5-a-1.js
 * @description Object.keys - 'value' attribute of element in returned array is correct.
 */


function testcase() {
        var obj = { prop1: 1 };

        var array = Object.keys(obj);

        var desc = Object.getOwnPropertyDescriptor(array, "0");

        return desc.hasOwnProperty("value") && desc.value === "prop1";
    }
runTestCase(testcase);
