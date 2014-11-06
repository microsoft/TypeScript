/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-53.js
 * @description Object.defineProperty - 'name' property doesn't exist in 'O', test [[Get]] of 'name' property is set as undefined if it is absent in accessor descriptor 'desc' (8.12.9 step 4.b)
 */


function testcase() {
        var obj = {};
        var setFunc = function (value) {
            obj.setVerifyHelpProp = value;
        };

        Object.defineProperty(obj, "property", {
            set: setFunc,
            enumerable: true,
            configurable: true
        });

        return accessorPropertyAttributesAreCorrect(obj, "property", undefined, setFunc, "setVerifyHelpProp", true, true);
    }
runTestCase(testcase);
