/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-159.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is the length property of 'O', the [[Value]] field of 'desc' equals to value of the length property, test TypeError wouldn't be thrown when the length property is not writable (15.4.5.1 step 3.f.i)
 */


function testcase() {

        var arr = [];

        Object.defineProperty(arr, "length", {
            writable: false
        });

        try {
            Object.defineProperties(arr, {
                length: {
                    value: 0
                }
            });
            return true && arr.length === 0;
        } catch (e) {
            return false;
        }
    }
runTestCase(testcase);
