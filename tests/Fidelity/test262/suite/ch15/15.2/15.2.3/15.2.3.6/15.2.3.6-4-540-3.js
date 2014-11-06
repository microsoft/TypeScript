/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-540-3.js
 * @description Object.defineProperty fails to update [[Get]] and [[Set]] attributes of a named accessor property 'P' whose [[Configurable]] attribute is false, 'O' is an Arguments object (8.12.9 step 11.a)
 */


function testcase() {
        var obj = (function () {
            return arguments;
        }());

        obj.verifySetFunction = "data";
        var getFunc = function () {
            return obj.verifySetFunction;
        };
        var setFunc = function (value) {
            obj.verifySetFunction = value;
        };
        Object.defineProperty(obj, "property", {
            get: getFunc,
            set: setFunc,
            configurable: false
        });

        var result = false;
        try {
            Object.defineProperty(obj, "property", {
                get: function () {
                    return 100;
                }
            });
        } catch (e) {
            result = e instanceof TypeError &&
                accessorPropertyAttributesAreCorrect(obj, "property", getFunc, setFunc, "verifySetFunction", false, false);
        }

        try {
            Object.defineProperty(obj, "property", {
                set: function (value) {
                    obj.verifySetFunction1 = value;
                }
            });
        } catch (e1) {
            return result && e1 instanceof TypeError &&
                accessorPropertyAttributesAreCorrect(obj, "property", getFunc, setFunc, "verifySetFunction", false, false);
        }
    }
runTestCase(testcase);
