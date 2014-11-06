/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-202.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is an array index named property, 'P' property doesn't exist in 'O', test [[Set]] of 'P' property in 'Attributes' is set as undefined value if [[Set]] is absent in accessor descriptor 'desc'  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];
        var getFunc = function () {
            return 11;
        };

        Object.defineProperties(arr, {
            "0": {
                get: getFunc,
                enumerable: true,
                configurable: true
            }
        });

        var verifyEnumerable = false;
        for (var i in arr) {
            if (i === "0" && arr.hasOwnProperty("0")) {
                verifyEnumerable = true;
            }
        }

        var desc = Object.getOwnPropertyDescriptor(arr, "0");
        var propertyDefineCorrect = arr.hasOwnProperty("0");

        var verifyConfigurable = false;
        delete arr[0];
        verifyConfigurable = arr.hasOwnProperty("0");
        return typeof desc.set === "undefined" && propertyDefineCorrect &&
            desc.get === getFunc && !verifyConfigurable && verifyEnumerable;

    }
runTestCase(testcase);
