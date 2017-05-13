/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-57.js
 * @description Object.defineProperty - 'desc' is accessor descriptor, test updating all attribute values of 'name' (8.12.9 step 4.b.i)
 */


function testcase() {
        var obj = {};
        var setFunc = function (value) {
            obj.setVerifyHelpProp = value;
        };
        var getFunc = function () {
            return 14;
        };

        Object.defineProperty(obj, "property", {
            get: function () {
                return 11;
            },
            set: function (value) { },
            configurable: true,
            enumerable: true
        });

        Object.defineProperty(obj, "property", {
            get: getFunc,
            set: setFunc,
            configurable: false,
            enumerable: false
        });

        return accessorPropertyAttributesAreCorrect(obj, "property", getFunc, setFunc, "setVerifyHelpProp", false, false);
    }
runTestCase(testcase);
