/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-78.js
 * @description Object.defineProperty - desc.[[Set]] and name.[[Set]] are two objects which refer to the different objects (8.12.9 step 6)
 */


function testcase() {

        var obj = {};

        function setFunc1() { }

        Object.defineProperty(obj, "foo", {
            set: setFunc1,
            configurable: true
        });

        function setFunc2(value) {
            obj.setVerifyHelpProp = value;
        }

        Object.defineProperty(obj, "foo", { set: setFunc2 });
        return accessorPropertyAttributesAreCorrect(obj, "foo", undefined, setFunc2, "setVerifyHelpProp", false, true);
    }
runTestCase(testcase);
