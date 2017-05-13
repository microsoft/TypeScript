/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-293-3.js
 * @description Object.defineProperty - 'O' is an Arguments object of a function that has formal parameters, 'name' is own data property of 'O' which is also defined in [[ParameterMap]] of 'O', test TypeError is not thrown when updating the [[Value]] attribute value of 'name' which is defined as non-writable and configurable (10.6 [[DefineOwnProperty]] step 3 and step 5.b)
 */


function testcase() {
        return (function (a, b, c) {
        Object.defineProperty(arguments, "0", {
            value: 10,
            writable: false,
        });
        Object.defineProperty(arguments, "0", {
            value: 20
        });
        var verifyFormal = a === 10;        
        return dataPropertyAttributesAreCorrect(arguments, "0", 20, false, true, true) && verifyFormal;
        }(0, 1, 2));
    }
runTestCase(testcase);
