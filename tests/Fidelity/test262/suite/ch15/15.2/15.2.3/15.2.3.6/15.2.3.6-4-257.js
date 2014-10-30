/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-257.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, 'name' is accessor property and 'desc' is accessor descriptor, and the [[Configurable]] attribute value of 'name' is false, test TypeError is not thrown if the [[Get]] field of 'desc' is present, and the [[Get]] field of 'desc' and the [[Get]] attribute value of 'name' are undefined (15.4.5.1 step 4.c)
 */


function testcase() {
        var arrObj = [];
        function setFunc(value) {
            arrObj.setVerifyHelpProp = value;
        }

        Object.defineProperty(arrObj, "1", {
            get: undefined,
            set: setFunc,
            configurable: false
        });

        try {
            Object.defineProperty(arrObj, "1", {
                get: undefined
            });

            return accessorPropertyAttributesAreCorrect(arrObj, "1", undefined, setFunc, "setVerifyHelpProp", false, false);
        } catch (e) {
            return false;
        }
    }
runTestCase(testcase);
