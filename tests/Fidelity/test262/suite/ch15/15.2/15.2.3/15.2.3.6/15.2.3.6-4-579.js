/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-579.js
 * @description ES5 Attributes - Success to add property into object (Array instance)
 */


function testcase() {
        var data = "data";
        try {
            Object.defineProperty(Array.prototype, "prop", {
                get: function () {
                    return data;
                },
                set: function (value) {
                    data = value;
                },
                enumerable: true,
                configurable: true
            });
            var arrObj = [];
            arrObj.prop = "myOwnProperty";

            return !arrObj.hasOwnProperty("prop") && arrObj.prop === "myOwnProperty" && data === "myOwnProperty";
        } finally {
            delete Array.prototype.prop;
        }
    }
runTestCase(testcase);
