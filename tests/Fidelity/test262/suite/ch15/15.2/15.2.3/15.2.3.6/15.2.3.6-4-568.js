/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-568.js
 * @description ES5 Attributes - [[Get]] attribute is a function which has two arguments
 */


function testcase() {
        var obj = {};
        var getFunc = function (arg1, arg2) {
            return 2010;
        };

        Object.defineProperty(obj, "prop", {
            get: getFunc
        });

        var desc = Object.getOwnPropertyDescriptor(obj, "prop");

        return obj.hasOwnProperty("prop") && obj.prop === 2010 && desc.get === getFunc;
    }
runTestCase(testcase);
