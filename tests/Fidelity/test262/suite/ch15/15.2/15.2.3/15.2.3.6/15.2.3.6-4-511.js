/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-511.js
 * @description ES5 Attributes - fail to update the accessor property ([[Get]] is a Function, [[Set]] is undefined, [[Enumerable]] is true, [[Configurable]] is false) to a data property
 */


function testcase() {
        var obj = {};

        var getFunc = function () {
            return 1001;
        };

        Object.defineProperty(obj, "prop", {
            get: getFunc,
            set: undefined,
            enumerable: true,
            configurable: false
        });
        var desc1 = Object.getOwnPropertyDescriptor(obj, "prop");

        try {
            Object.defineProperty(obj, "prop", {
                value: 1001
            });

            return false;
        } catch (e) {
            var desc2 = Object.getOwnPropertyDescriptor(obj, "prop");

            return desc1.hasOwnProperty("get") && !desc2.hasOwnProperty("value") && e instanceof TypeError;
        }
    }
runTestCase(testcase);
