/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-5-a-3.js
 * @description Object.keys - 'enumerable' attribute of element of returned array is correct
 */


function testcase() {
        var obj = { prop1: 100 };

        var array = Object.keys(obj);
        var desc = Object.getOwnPropertyDescriptor(array, "0");
        var result = false;
        for (var index in array) {
            if (obj.hasOwnProperty(array[index]) && array[index] === "prop1") {
                result = true;
            }
        }

        return result && desc.hasOwnProperty("enumerable") && desc.enumerable === true;
    }
runTestCase(testcase);
