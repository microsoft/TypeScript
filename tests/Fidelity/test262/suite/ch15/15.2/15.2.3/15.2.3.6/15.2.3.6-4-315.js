/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-315.js
 * @description Object.defineProperty - 'O' is an Arguments object, 'P' is generic own accessor property of 'O', and 'desc' is accessor descriptor, test updating multiple attribute values of 'P' (10.6 [[DefineOwnProperty]] step 3)
 */


function testcase() {
        return (function () {
            Object.defineProperty(arguments, "genericProperty", {
                get: function () {
                    return 1001;
                },
                set: function (value) {
                    this.testgetFunction1 = value;
                },
                enumerable: true,
                configurable: true
            });
            function getFunc() {
                return "getFunctionString";
            }
            function setFunc(value) {
                this.testgetFunction = value;
            }
            Object.defineProperty(arguments, "genericProperty", {
                get: getFunc,
                set: setFunc,
                enumerable: false,
                configurable: false
            });
            return accessorPropertyAttributesAreCorrect(arguments, "genericProperty", getFunc, setFunc, "testgetFunction", false, false);
        }(1, 2, 3));
    }
runTestCase(testcase);
