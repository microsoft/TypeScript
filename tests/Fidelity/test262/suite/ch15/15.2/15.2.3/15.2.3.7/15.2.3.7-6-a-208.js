/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-208.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is an array index named property, 'P' makes no change if the value of every field in 'desc' is the same value as the corresponding field in 'P'(desc is data property)  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];

        arr[0] = 100; // default value of attributes: writable: true, configurable: true, enumerable: true

        Object.defineProperties(arr, {
            "0": {
                value: 100,
                writable: true,
                enumerable: true,
                configurable: true
            }
        });

        return dataPropertyAttributesAreCorrect(arr, "0", 100, true, true, true);
    }
runTestCase(testcase);
