/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-622.js
 * @description ES5 Attributes - all attributes in Date.now are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Date, "now");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = Date.now;

        try {
            Date.now = "2010";

            var isWritable = (Date.now === "2010");

            var isEnumerable = false;

            for (var prop in Date) {
                if (prop === "now") {
                    isEnumerable = true;
                }
            }

            delete Date.now;

            var isConfigurable = !Date.hasOwnProperty("now");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(Date, "now", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);
