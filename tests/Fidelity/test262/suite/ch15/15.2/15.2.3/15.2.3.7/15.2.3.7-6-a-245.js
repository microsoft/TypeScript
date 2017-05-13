/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-245.js
 * @description Object.defineProperties - TypeError is thrown if 'O' is an Array, 'P' is an array index named property that already exists on 'O' is accessor property with  [[Configurable]] false, 'desc' is accessor descriptor, the [[Get]] field of 'desc' is present, and  the [[Get]] field of 'desc' is an object and the [[Get]] attribute value of 'P' is undefined  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];

        function get_fun() {
            return 36;
        }
        Object.defineProperty(arr, "1", {
            get: get_fun
        });

        try {
            Object.defineProperties(arr, {
                "1": {
                    get: undefined
                }
            });
            return false;
        } catch (ex) {
            return (ex instanceof TypeError) && accessorPropertyAttributesAreCorrect(arr, "1", get_fun, undefined, undefined, false, false);
        }
    }
runTestCase(testcase);
