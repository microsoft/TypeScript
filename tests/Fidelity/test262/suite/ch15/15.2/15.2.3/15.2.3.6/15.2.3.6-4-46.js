/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-46.js
 * @description Object.defineProperty - 'name' is defined as data property if 'name' property doesn't exist in 'O' and 'desc' is generic descriptor (8.12.9 step 4.a)
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "property", {
            enumerable: true
        });

        var isEnumerable = false;
        for (var item in obj) {
            if (obj.hasOwnProperty(item) && item === "property") {
                isEnumerable = true;
            }
        }

        return obj.hasOwnProperty("property") && isEnumerable;
    }
runTestCase(testcase);
