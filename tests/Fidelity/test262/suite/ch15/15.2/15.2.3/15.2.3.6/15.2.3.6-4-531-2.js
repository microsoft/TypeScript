/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-531-2.js
 * @description Object.defineProperty will update [[Get]] and [[Set]] attributes of indexed accessor property 'P' successfully when [[Configurable]] attribute is true, 'A' is an Array object (8.12.9 step 11)
 */


function testcase() {

        var obj = [];

        obj.verifySetFunction = "data";
        Object.defineProperty(obj, "0", {
            get: function () {
                return obj.verifySetFunction;
            },
            set: function (value) {
                obj.verifySetFunction = value;
            },
            configurable: true
        });

        obj.verifySetFunction1 = "data1";
        var getFunc = function () {
            return obj.verifySetFunction1;
        };
        var setFunc = function (value) {
            obj.verifySetFunction1 = value;
        };

        Object.defineProperty(obj, "0", {
            get: getFunc,
            set: setFunc
        });

        return accessorPropertyAttributesAreCorrect(obj, "0", getFunc, setFunc, "verifySetFunction1", false, true);
    }
runTestCase(testcase);
