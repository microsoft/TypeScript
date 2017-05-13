/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-239.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, TypeError is thrown if the [[Configurable]] attribute value of 'name' is false, and [[Enumerable]] of 'desc' is present and its value is different from the [[Enumerable]] attribute value of 'name' (15.4.5.1 step 4.c)
 */


function testcase() {

        var arrObj = [];

        Object.defineProperty(arrObj, "1", {
            value: 3,
            writable: true,
            configurable: false,
            enumerable: false
        });

        try {
            Object.defineProperty(arrObj, "1", {
                value: 13,
                writable: true,
                enumerable: true
            });
            return false;

        } catch (e) {
            return e instanceof TypeError && dataPropertyAttributesAreCorrect(arrObj, "1", 3, true, false, false);
        }
    }
runTestCase(testcase);
