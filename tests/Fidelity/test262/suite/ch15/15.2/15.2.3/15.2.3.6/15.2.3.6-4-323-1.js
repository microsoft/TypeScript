/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-323-1.js
 * @description Object.defineProperty - ''O' is an Arguments object of a function that has formal parameters, 'P' is own accessor property of 'O', test TypeError is thrown when updating the [[Enumerable]] attribute value of 'P' which is not configurable (10.6 [[DefineOwnProperty]] step 4)
 */


function testcase() {
        return (function (a, b, c) {
            function setFunc(value) {
                this.genericPropertyString = value;
            }
            Object.defineProperty(arguments, "genericProperty", {
                set: setFunc,
                enumerable: true,
                configurable: false
            });
            try {
                Object.defineProperty(arguments, "genericProperty", {
                    enumerable: false
                });
            } catch (e) {
                verifyFormal = c === 3;
                return e instanceof TypeError &&
                    accessorPropertyAttributesAreCorrect(arguments, "genericProperty", undefined, setFunc, "genericPropertyString", true, false) && verifyFormal;
            }
            return false;
        }(1, 2, 3));
    }
runTestCase(testcase);
