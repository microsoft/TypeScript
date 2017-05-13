/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-240.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, TypeError is thrown if 'name' is accessor property, and 'desc' is data descriptor, and the [[Configurable]] attribute value of 'name' is false (15.4.5.1 step 4.c)
 */


function testcase() {

        var arrObj = [];

        function setFunc(value) {
            arrObj.setVerifyHelpProp = value;
        }

        Object.defineProperty(arrObj, "1", {
            set: setFunc,
            configurable: false
        });

        try {
            Object.defineProperty(arrObj, "1", {
                value: 13
            });
            return false;

        } catch (e) {
            return e instanceof TypeError && accessorPropertyAttributesAreCorrect(arrObj, "1", undefined, setFunc, "setVerifyHelpProp", false, false);
        }
    }
runTestCase(testcase);
