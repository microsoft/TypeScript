/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-609.js
 * @description ES5 Attributes - all attributes in Object.isExtensible are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Object, "isExtensible");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = Object.isExtensible;

        try {
            Object.isExtensible = "2010";

            var isWritable = (Object.isExtensible === "2010");

            var isEnumerable = false;

            for (var prop in Object) {
                if (prop === "isExtensible") {
                    isEnumerable = true;
                }
            }
        
            delete Object.isExtensible;

            var isConfigurable = !Object.hasOwnProperty("isExtensible");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(Object, "isExtensible", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);
