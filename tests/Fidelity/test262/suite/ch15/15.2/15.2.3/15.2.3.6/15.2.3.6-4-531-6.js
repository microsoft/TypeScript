/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-531-6.js
 * @description ES5 Attributes - Updating an indexed accessor property 'P' without [[Set]] using simple assignment is failed, 'A' is an Array object (8.12.5 step 5.b)
 */


function testcase() {
        var obj = [];

        var verifySetFunc = "data";
        var getFunc = function () {
            return verifySetFunc;
        };

        Object.defineProperty(obj, "0", {
            get: getFunc,
            enumerable: true,
            configurable: true
        });

        obj[0] = "overrideData";
        var propertyDefineCorrect = obj.hasOwnProperty("0");
        var desc = Object.getOwnPropertyDescriptor(obj, "0");

        return propertyDefineCorrect && typeof desc.set === "undefined" && obj[0] === "data";
    }
runTestCase(testcase);
