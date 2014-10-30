/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-386.js
 * @description ES5 Attributes - [[Value]] attribute of data property is an Array object
 */


function testcase() {
        var obj = {};
        var arrObj = [];

        Object.defineProperty(obj, "prop", {
            value: arrObj
        });

        var desc = Object.getOwnPropertyDescriptor(obj, "prop");

        return obj.prop === arrObj && desc.value === arrObj;
    }
runTestCase(testcase);
