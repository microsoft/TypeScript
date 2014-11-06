/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-76.js
 * @description Object.defineProperty - desc.[[Get]] and name.[[Get]] are two objects which refer to the different objects (8.12.9 step 6)
 */


function testcase() {

        var obj = {};

        function getFunc1() {
            return 10;
        }
        function setFunc1(value) {
            obj.helpVerifySet = value;
        }

        Object.defineProperty(obj, "foo", {
            get: getFunc1,
            set: setFunc1,
            configurable: true
        });

        function getFunc2() {
            return 20;
        }

        Object.defineProperty(obj, "foo", { get: getFunc2 });
        return accessorPropertyAttributesAreCorrect(obj, "foo", getFunc2, setFunc1, "helpVerifySet", false, true);
    }
runTestCase(testcase);
