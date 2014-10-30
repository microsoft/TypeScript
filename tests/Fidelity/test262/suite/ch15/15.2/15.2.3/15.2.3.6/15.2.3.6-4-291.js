/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-291.js
 * @description Object.defineProperty - 'O' is an Arguments object, 'name' is own accessor property of 'O', and 'desc' is accessor descriptor, test updating multiple attribute values of 'name' (10.6 [[DefineOwnProperty]] step 3)
 */


function testcase() {
        return (function () {
            function getFunc1() {
                return 10;
            }
            Object.defineProperty(arguments, "0", {
                get: getFunc1,
                enumerable: true,
                configurable: true
            });
            function getFunc2() {
                return 20;
            }
            Object.defineProperty(arguments, "0", {
                get: getFunc2,
                enumerable: false,
                configurable: false
            });
            return accessorPropertyAttributesAreCorrect(arguments, "0", getFunc2, undefined, undefined, false, false);
        }(0, 1, 2));
    }
runTestCase(testcase);
