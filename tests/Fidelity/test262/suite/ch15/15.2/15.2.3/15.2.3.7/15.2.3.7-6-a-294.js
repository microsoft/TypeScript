/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-294.js
 * @description Object.defineProperties - 'O' is an Arguments object, 'P' is an array index named data property of 'O' but not defined in [[ParameterMap]] of 'O', test TypeError is thrown when updating the [[Value]] attribute value of 'P' which is not writable and not configurable (10.6 [[DefineOwnProperty]] step 4)
 */


function testcase() {

        var arg;

        (function fun() {
            arg = arguments;
        }());

        Object.defineProperty(arg, "0", {
            value: 0,
            writable: false,
            configurable: false
        });

        try {
            Object.defineProperties(arg, {
                "0": {
                    value: 10
                }
            });

            return false;
        } catch (e) {
            return (e instanceof TypeError) && dataPropertyAttributesAreCorrect(arg, "0", 0, false, false, false);
        }
    }
runTestCase(testcase);
