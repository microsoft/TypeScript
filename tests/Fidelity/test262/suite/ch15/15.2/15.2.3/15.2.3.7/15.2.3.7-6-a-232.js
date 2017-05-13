/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-232.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is an array index property,  'P' is accessor property and 'desc' is data descriptor, and the [[Configurable]] attribute value of 'P' is true, test 'P' is converted from accessor property to data property  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];

        Object.defineProperty(arr, "1", {
            get: function () {
                return 3;
            },
            configurable: true

        });

        Object.defineProperties(arr, {
            "1": {
                value: 12
            }
        });

        return dataPropertyAttributesAreCorrect(arr, "1", 12, false, false, true);
    }
runTestCase(testcase);
