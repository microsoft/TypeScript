/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-216.js
 * @description Object.defineProperties - 'O' is an Array, 'name' is an array index property, the [[Value]] field of 'desc' and the [[Value]] attribute value of 'name' are two strings which have same length and same characters in corresponding positions  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];

        Object.defineProperty(arr, "0", {
            value: "abcd"
        });

        try {
            Object.defineProperties(arr, {
                "0": {
                    value: "abcd"
                }
            });
            return dataPropertyAttributesAreCorrect(arr, "0", "abcd", false, false, false);
        } catch (e) {
            return false;
        }
    }
runTestCase(testcase);
