/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-623.js
 * @description ES5 Attributes - all attributes in Date.prototype.toISOString are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Date.prototype, "toISOString");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = Date.prototype.toISOString;

        try {
            Date.prototype.toISOString = "2010";

            var isWritable = (Date.prototype.toISOString === "2010");

            var isEnumerable = false;

            for (var prop in Date.prototype) {
                if (prop === "toISOString") {
                    isEnumerable = true;
                }
            }

            delete Date.prototype.toISOString;

            var isConfigurable = !Date.prototype.hasOwnProperty("toISOString");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(Date.prototype, "toISOString", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);
