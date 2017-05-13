/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-55.js
 * @description Object.defineProperty - 'name' property doesn't exist in 'O', test [[Enumerable]] of 'name' property of 'Attributes' is set as false value if absent in accessor descriptor 'desc' (8.12.9 step 4.b.i)
 */


function testcase() {
        var obj = {};

        var setFunc = function (value) {
            obj.setVerifyHelpProp = value;
        };
        var getFunc = function () {
            return 10;
        };

        Object.defineProperty(obj, "property", {
            set: setFunc,
            get: getFunc,
            configurable: true
        });
        return accessorPropertyAttributesAreCorrect(obj, "property", getFunc, setFunc, "setVerifyHelpProp", false, true);
    }
runTestCase(testcase);
