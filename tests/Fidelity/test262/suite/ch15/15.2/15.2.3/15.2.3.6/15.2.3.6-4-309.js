/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-309.js
 * @description Object.defineProperty - 'O' is an Arguments object, 'name' is an index named accessor property of 'O' but not defined in [[ParameterMap]] of 'O', test TypeError is thrown when updating the [[Get]] attribute value of 'name' which is not configurable (10.6 [[DefineOwnProperty]] step 4)
 */


function testcase() {
        return (function () {
            function getFunc1() {
                return 0;
            }
            Object.defineProperty(arguments, "0", {
                get: getFunc1,
                enumerable: false,
                configurable: false
            });
            function getFunc2() {
                return 10;
            }
            try {
                Object.defineProperty(arguments, "0", {
                    get: getFunc2
                });
                return false;
            } catch (e) {
                return e instanceof TypeError && accessorPropertyAttributesAreCorrect(arguments, "0", getFunc1, undefined, undefined, false, false);
            }
        }());
    }
runTestCase(testcase);
