/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-164.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is the length property of 'O', the [[Value]] field of 'desc' is less than value of the length property, test the [[Writable]] attribute of the length property in 'O' is set as true before deleting properties with large index named (15.4.5.1 step 3.i.iii)
 */


function testcase() {

        var arr = [0, 1, 2];
        var result = 0;

        try {
            Object.defineProperty(arr, "1", {
                configurable: false
            });

            Object.defineProperties(arr, {
                length: {
                    value: 0,
                    writable: false
                }
            });

            return false;
        } catch (e) {
            result = (arr.length === 2);
            arr.length = 10;
            return (e instanceof TypeError) && result && arr.length === 2;
        }
    }
runTestCase(testcase);
