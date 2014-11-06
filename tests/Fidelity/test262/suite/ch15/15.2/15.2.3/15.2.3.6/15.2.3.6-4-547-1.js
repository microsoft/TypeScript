/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-547-1.js
 * @description ES5 Attributes - Updating an indexed accessor property 'P' whose [[Configurable]] attribute is false to a data property does not succeed, 'A' is an Array object (8.12.9 step 9.a)
 */


function testcase() {
        var obj = [];
        
        obj.verifySetFunc = "data";
        var getFunc = function () {
            return obj.verifySetFunc;
        };

        var setFunc = function (value) {
            obj.verifySetFunc = value;
        };

        Object.defineProperty(obj, "0", {
            get: getFunc,
            set: setFunc,
            enumerable: true,
            configurable: false
        });
        var desc1 = Object.getOwnPropertyDescriptor(obj, "0");

        try {
            Object.defineProperty(obj, "0", {
                value: 1001
            });

            return false;
        } catch (e) {
            var desc2 = Object.getOwnPropertyDescriptor(obj, "0");

            return desc1.hasOwnProperty("get") && !desc2.hasOwnProperty("value") && e instanceof TypeError &&
                accessorPropertyAttributesAreCorrect(obj, "0", getFunc, setFunc, "verifySetFunc", true, false);
        }
    }
runTestCase(testcase);
