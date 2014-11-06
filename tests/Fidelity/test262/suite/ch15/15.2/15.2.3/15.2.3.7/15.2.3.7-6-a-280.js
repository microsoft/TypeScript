/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-280.js
 * @description Object.defineProperties - 'O' is an Arguments object, 'P' is own accessor property of 'O' which is also defined in [[ParameterMap]] of 'O', and 'desc' is accessor descriptor, test updating multiple attribute values of 'P' (10.6 [[DefineOwnProperty]] step 3)
 */


function testcase() {

        var arg;

        (function fun(a, b, c) {
            arg = arguments;
        } (0, 1, 2));

        function get_func1() {
            return 10;
        }

        Object.defineProperty(arg, "0", {
            get: get_func1,
            enumerable: true,
            configurable: true
        });

        function get_func2() {
            return 20;
        }

        Object.defineProperties(arg, {
            "0": {
                get: get_func2,
                enumerable: false,
                configurable: false
            }
        });

        var desc = Object.getOwnPropertyDescriptor(arg, "0");
        return desc.get === get_func2 && typeof desc.set === "undefined" &&
            desc.configurable === false && desc.enumerable === false;
    }
runTestCase(testcase);
