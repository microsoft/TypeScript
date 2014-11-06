/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.4/15.2.3.4-4-b-2.js
 * @description Object.getOwnPropertyNames - all own properties are pushed into the returned array
 */


function testcase() {
        var obj = { "a": "a" };

        Object.defineProperty(obj, "b", {
            get: function () {
                return "b";
            },
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(obj, "c", {
            get: function () {
                return "c";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "d", {
            value: "d",
            enumerable: false,
            configurable: true
        });

        var result = Object.getOwnPropertyNames(obj);
        var expResult = ["a", "b", "c", "d"];

        return compareArray(expResult, result);
    }
runTestCase(testcase);
