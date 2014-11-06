/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-531-8.js
 * @description ES5 Attributes - Updating a named accessor property 'P' without [[Set]] using simple assignment is failed, 'O' is the global object (8.12.5 step 5.b)
 */


function testcase() {
        var obj = fnGlobalObject();
        try {
            obj.verifySetFunc = "data";
            var getFunc = function () {
                return obj.verifySetFunc;
            };

            Object.defineProperty(obj, "prop", {
                get: getFunc,
                enumerable: true,
                configurable: true
            });

            obj.prop = "overrideData";
            var propertyDefineCorrect = obj.hasOwnProperty("prop");
            var desc = Object.getOwnPropertyDescriptor(obj, "prop");

            return propertyDefineCorrect && typeof desc.set === "undefined" && obj.prop === "data";
        } finally {
            delete obj.prop;
            delete obj.verifySetFunc;
        }
    }
runTestCase(testcase);
