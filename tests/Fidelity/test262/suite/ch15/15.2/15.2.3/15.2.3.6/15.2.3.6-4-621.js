/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-621.js
 * @description ES5 Attributes - all attributes in String.prototype.trim are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(String.prototype, "trim");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = String.prototype.trim;

        try {
            String.prototype.trim = "2010";

            var isWritable = (String.prototype.trim === "2010");

            var isEnumerable = false;

            for (var prop in String.prototype) {
                if (prop === "trim") {
                    isEnumerable = true;
                }
            }

            delete String.prototype.trim;

            var isConfigurable = !String.prototype.hasOwnProperty("trim");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(String.prototype, "trim", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);
