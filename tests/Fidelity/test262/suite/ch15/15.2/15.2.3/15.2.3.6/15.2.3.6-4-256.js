/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-256.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, 'name' is accessor property and 'desc' is accessor descriptor, and the [[Configurable]] attribute value of 'name' is false, test TypeError is thrown if the [[Get]] field of 'desc' is present, and the [[Get]] field of 'desc' is an object and the [[Get]] attribute value of 'name' is undefined (15.4.5.1 step 4.c)
 */


function testcase() {
        var arrObj = [];
        function getFunc() {
            return 12;
        }

        Object.defineProperty(arrObj, "1", {
            get: getFunc
        });

        try {
            Object.defineProperty(arrObj, "1", {
                get: undefined
            });
            return false;
        } catch (e) {
            var hasProperty = arrObj.hasOwnProperty("1");
            var desc = Object.getOwnPropertyDescriptor(arrObj, "1");

            var verifyGet = arrObj[1] === getFunc();

            var verifySet = desc.hasOwnProperty("set") && typeof desc.set === "undefined";

            var verifyEnumerable = false;
            for (var p in arrObj) {
                if (p === "1") {
                    verifyEnumerable = true
                }
            }

            var verifyConfigurable = false;
            delete arrObj[1];
            verifyConfigurable = arrObj.hasOwnProperty("1");

            return e instanceof TypeError && hasProperty && verifyGet &&
                verifySet && !verifyEnumerable && verifyConfigurable;
        }
    }
runTestCase(testcase);
