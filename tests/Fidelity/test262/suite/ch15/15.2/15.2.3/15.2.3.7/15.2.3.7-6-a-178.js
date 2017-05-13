/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-178.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is an array index named property, 'P' is available String values that convert to numbers (15.4.5.1 step 4.a)
 */


function testcase() {

        var arr = [0];

        Object.defineProperties(arr, {
            "0": {
                value: 12
            }
        });
        return arr[0] === 12;
    }
runTestCase(testcase);
