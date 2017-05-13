/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-225.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index property, test TypeError is thrown when the [[Value]] field of 'desc' and the [[Value]] attribute value of 'name' are two booleans with different values (15.4.5.1 step 4.c)
 */


function testcase() {
        var arrObj = [];

        Object.defineProperty(arrObj, 0, {
            value: true,
            writable: false,
            configurable: false
        });

        try {
            Object.defineProperty(arrObj, "0", { value: false });
            return false;
        } catch (e) {
            return e instanceof TypeError && dataPropertyAttributesAreCorrect(arrObj, "0", true, false, false, false);
        }
    }
runTestCase(testcase);
