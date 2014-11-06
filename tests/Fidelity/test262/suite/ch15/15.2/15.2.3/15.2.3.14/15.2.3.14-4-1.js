/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-4-1.js
 * @description Object.keys - elements of the returned array start from index 0
 */


function testcase() {
        var obj = { prop1: 1001, prop2: 1002 };

        Object.defineProperty(obj, "prop3", {
            value: 1003,
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "prop4", {
            get: function () {
                return 1003;
            },
            enumerable: true,
            configurable: true
        });

        var arr = Object.keys(obj);

        return arr.hasOwnProperty(0) && arr[0] === "prop1";
    }
runTestCase(testcase);
