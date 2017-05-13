/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-206.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is an array index named property, 'P' makes no change if every field in 'desc' is absent (name is data property)  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];

        arr[0] = 101; // default value of attributes: writable: true, configurable: true, enumerable: true

        try {
            Object.defineProperties(arr, {
                "0": {}
            });
            return dataPropertyAttributesAreCorrect(arr, "0", 101, true, true, true);
        } catch (e) {
            return false;
        }
    }
runTestCase(testcase);
