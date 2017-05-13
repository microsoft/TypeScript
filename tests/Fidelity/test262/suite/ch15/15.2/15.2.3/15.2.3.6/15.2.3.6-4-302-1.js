/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-302-1.js
 * @description Object.defineProperty - 'O' is an Arguments object of a function that has formal parameters, 'name' is an index named property of 'O' but not defined in [[ParameterMap]] of 'O', and 'desc' is accessor descriptor, test 'name' is defined in 'O' with all correct attribute values (10.6 [[DefineOwnProperty]] step 3 and step 5a)
 */


function testcase() {
        return (function (a, b, c) {
            delete arguments[0];
            function getFunc() {
                return 10;
            }
            function setFunc(value) {
                this.setVerifyHelpProp = value;
            }
            Object.defineProperty(arguments, "0", {
                get: getFunc,
                set: setFunc,
                enumerable: false,
                configurable: false
            });
            var verifyFormal = a === 0;
            return accessorPropertyAttributesAreCorrect(arguments, "0", getFunc, setFunc, "setVerifyHelpProp", false, false) && verifyFormal;
        }(0, 1, 2));
    }
runTestCase(testcase);
