/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-276.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is generic own accessor property of 'O', test TypeError is thrown when updating the [[Enumerable]] attribute value of 'P' which is defined as non-configurable (15.4.5.1 step 5)
 */


function testcase() {

        var arr = [];

        function set_fun(value) {
            arr.setVerifyHelpProp = value;
        }
        Object.defineProperty(arr, "property", {
            set: set_fun,
            enumerable: false
        });

        try {
            Object.defineProperties(arr, {
                "property": {
                    enumerable: true
                }
            });
            return false;
        } catch (ex) {
            return (ex instanceof TypeError) && accessorPropertyAttributesAreCorrect(arr, "property", undefined, set_fun, "setVerifyHelpProp", false, false);
        }
    }
runTestCase(testcase);
