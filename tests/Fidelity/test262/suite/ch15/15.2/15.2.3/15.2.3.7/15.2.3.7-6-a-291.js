/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-291.js
 * @description Object.defineProperties - 'O' is an Arguments object, 'P' is an array index named property of 'O' but not defined in [[ParameterMap]] of 'O', and 'desc' is accessor descriptor, test 'P' is defined in 'O' with all correct attribute values (10.6 [[DefineOwnProperty]] step 3)
 */


function testcase() {

        var arg;

        (function fun() {
            arg = arguments;
        }(0, 1, 2));

        delete arg[0];

        function get_func() {
            return 10;
        }
        function set_func(value) {
            arg.setVerifyHelpProp = value;
        }

        Object.defineProperties(arg, {
            "0": {
                get: get_func,
                set: set_func,
                enumerable: false,
                configurable: false
            }
        });

        return accessorPropertyAttributesAreCorrect(arg, "0", get_func, set_func, "setVerifyHelpProp", false, false);
    }
runTestCase(testcase);
