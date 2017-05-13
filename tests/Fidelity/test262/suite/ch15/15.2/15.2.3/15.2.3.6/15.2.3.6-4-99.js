/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-99.js
 * @description Object.defineProperty will throw TypeError when name.configurable = false, name.[[Get]] is undefined, desc.[[Get]] refers to an object (8.12.9 step 11.a.ii)
 */


function testcase() {

        var obj = {};

        function setFunc(value) {
            obj.setVerifyHelpProp = value;
        }

        Object.defineProperty(obj, "foo", {
            set: setFunc,
            configurable: false
        });

        function getFunc() {
            return 10;
        }

        try {
            Object.defineProperty(obj, "foo", {
                get: getFunc,
                set: setFunc
            });
            return false;
        } catch (e) {
            return e instanceof TypeError && accessorPropertyAttributesAreCorrect(obj, "foo", undefined, setFunc, "setVerifyHelpProp", false, false);
        }
    }
runTestCase(testcase);
