/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-5-4.js
 * @description Object.keys - non-enumerable own accessor property of 'O' is not defined in returned array
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "prop1", {
            get: function () { },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(obj, "prop2", {
            get: function () { },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(obj, "prop3", {
            get: function () { },
            enumerable: true,
            configurable: true
        });

        var arr = Object.keys(obj);

        for (var p in arr) {
            if (arr.hasOwnProperty(p)) {
                if (arr[p] === "prop2") {
                    return false;
                }
            }
        }

        return true;
    }
runTestCase(testcase);
