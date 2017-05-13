/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-2-8.js
 * @description Object.keys - 'n' is the correct value when enumerable properties exist in 'O'
 */


function testcase() {
        var obj = {
            prop1: 1001,
            prop2: function () {
                return 1002;
            }
        };

        Object.defineProperty(obj, "prop3", {
            value: 1003,
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(obj, "prop4", {
            get: function () {
                return 1004;
            },
            enumerable: false,
            configurable: true
        });

        var arr = Object.keys(obj);

        return (arr.length === 2) && (arr[0] === "prop1") && (arr[1] === "prop2");
    }
runTestCase(testcase);
