/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-97.js
 * @description Object.defineProperty will throw TypeError when name.configurable = false, name.[[Set]] is undefined, desc.[[Set]] refers to an object (8.12.9 step 11.a.i)
 */


function testcase() {

        var obj = {};

        function getFunc() {
            return "property";
        }

        Object.defineProperty(obj, "property", {
            get: getFunc,
            configurable: false
        });

        try {
            Object.defineProperty(obj, "property", {
                get: getFunc,
                set: function () { },
                configurable: false
            });

            return false;
        } catch (e) {
            return e instanceof TypeError &&
                accessorPropertyAttributesAreCorrect(obj, "property", getFunc, undefined, undefined, false, false);
        }
    }
runTestCase(testcase);
