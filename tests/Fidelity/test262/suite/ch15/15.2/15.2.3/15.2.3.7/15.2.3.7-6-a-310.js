/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-310.js
 * @description Object.defineProperties - 'O' is an Arguments object, 'P' is generic own accessor property of 'O', test TypeError is thrown when updating the [[Get]] attribute value of 'P' which is not configurable (10.6 [[DefineOwnProperty]] step 4)
 */


function testcase() {
        var arg = (function () {
            return arguments;
        } (1, 2, 3));

        function getFun() {
            return "genericPropertyString";
        }
        function setFun(value) {
            arg.verifySetFun = value;
        }
        Object.defineProperty(arg, "genericProperty", {
            get: getFun,
            set: setFun,
            configurable: false
        });

        try {
            Object.defineProperties(arg, {
                "genericProperty": {
                    get: function () {
                        return "overideGenericPropertyString";
                    }
                }
            });

            return false;
        } catch (ex) {
            return ex instanceof TypeError &&
                accessorPropertyAttributesAreCorrect(arg, "genericProperty", getFun, setFun, "verifySetFun", false, false, false);
        }
    }
runTestCase(testcase);
