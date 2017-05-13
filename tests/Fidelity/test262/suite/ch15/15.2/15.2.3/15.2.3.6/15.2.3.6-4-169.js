/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-169.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is the length property of 'O', the [[Value]] field of 'desc' is less than value of  the length property and also lesser than an index of the array which is set to configurable: false, test that new length is set to a value greater than the non-deletable index by 1, and TypeError is thrown (15.4.5.1 step 3.l.i)
 */


function testcase() {

        var arrObj = [0, 1, 2];

        Object.defineProperty(arrObj, "1", {
            configurable: false
        });

        Object.defineProperty(arrObj, "2", {
            configurable: true
        });

        try {
            Object.defineProperty(arrObj, "length", {
                value: 1
            });
            return false;
        } catch (e) {
            return e instanceof TypeError && arrObj.length === 2 && !arrObj.hasOwnProperty("2");
        }
    }
runTestCase(testcase);
