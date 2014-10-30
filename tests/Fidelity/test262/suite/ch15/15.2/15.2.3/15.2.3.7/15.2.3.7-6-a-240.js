/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-240.js
 * @description Object.defineProperties - TypeError is thrown if 'O' is an Array, 'P' is an array index named property that already exists on 'O' is data property with  [[Configurable]], [[Writable]] false, 'desc' is data descriptor, [[Value]] field of 'desc' and the [[Value]] attribute value of 'P' are two objects which refer to the different objects (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];
        var obj1 = { value: 12 };
        var obj2 = { value: 36 };

        Object.defineProperty(arr, "1", {
            value: obj1
        });

        try {
            Object.defineProperties(arr, {
                "1": {
                    value: obj2
                }
            });

            return false;
        } catch (ex) {
            return (ex instanceof TypeError) && dataPropertyAttributesAreCorrect(arr, "1", obj1, false, false, false);
        }
    }
runTestCase(testcase);
