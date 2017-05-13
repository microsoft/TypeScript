/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-219.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is an array index property that already exists on 'O' with [[Writable]] true, and the [[Writable]] field of 'desc' is true  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];

        Object.defineProperty(arr, "0", {
            writable: true
        });

        try {
            Object.defineProperties(arr, {
                "0": {
                    writable: true
                }
            });
            return dataPropertyAttributesAreCorrect(arr, "0", undefined, true, false, false);
        } catch (e) {
            return false;
        }
    }
runTestCase(testcase);
