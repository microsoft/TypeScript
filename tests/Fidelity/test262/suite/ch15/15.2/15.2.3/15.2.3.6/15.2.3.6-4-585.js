/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-585.js
 * @description ES5 Attributes - Inherited property is enumerable (RegExp instance)
 */


function testcase() {
        var data = "data";
        try {
            Object.defineProperty(RegExp.prototype, "prop", {
                get: function () {
                    return data;
                },
                set: function (value) {
                    data = value;
                },
                enumerable: true,
                configurable: true
            });
            var regObj = new RegExp();
            var verifyEnumerable = false;
            for (var p in regObj) {
                if (p === "prop") {
                    verifyEnumerable = true;
                }
            }

            return !regObj.hasOwnProperty("prop") && verifyEnumerable;
        } finally {
            delete RegExp.prototype.prop;
        }
    }
runTestCase(testcase);
