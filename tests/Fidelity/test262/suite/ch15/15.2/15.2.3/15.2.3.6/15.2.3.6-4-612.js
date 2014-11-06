/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-612.js
 * @description ES5 Attributes - all attributes in Array.prototype.indexOf are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Array.prototype, "indexOf");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = Array.prototype.indexOf;

        try {
            Array.prototype.indexOf = "2010";

            var isWritable = (Array.prototype.indexOf === "2010");

            var isEnumerable = false;

            for (var prop in Array.prototype) {
                if (prop === "indexOf") {
                    isEnumerable = true;
                }
            }

            delete Array.prototype.indexOf;

            var isConfigurable = !Array.prototype.hasOwnProperty("indexOf");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(Array.prototype, "indexOf", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);
