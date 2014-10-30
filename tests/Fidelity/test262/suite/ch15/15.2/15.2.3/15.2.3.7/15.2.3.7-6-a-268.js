/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-268.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is generic own accessor property of 'O', and 'desc' is accessor descriptor, test updating multiple attribute values of 'P' (15.4.5.1 step 5)
 */


function testcase() {
        var arr = [];
        function get_fun() {
            return 12;
        }
        function set_fun(value) {
            arr.verifySetFun = value;
        }
        Object.defineProperty(arr, "property", {
            get: function () {
                return 36;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperties(arr, {
            "property": {
                get: get_fun,
                set: set_fun,
                enumerable: false
            }
        });
        return accessorPropertyAttributesAreCorrect(arr, "property", get_fun, set_fun, "verifySetFun", false, true);
    }
runTestCase(testcase);
