/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-598.js
 * @description ES5 Attributes - all attributes in Object.getPrototypeOf are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Object, "getPrototypeOf");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = Object.getPrototypeOf;

        try {
            Object.getPrototypeOf = "2010";

            var isWritable = (Object.getPrototypeOf === "2010");

            var isEnumerable = false;

            for (var prop in Object) {
                if (prop === "getPrototypeOf") {
                    isEnumerable = true;
                }
            }
        
            delete Object.getPrototypeOf;

            var isConfigurable = !Object.hasOwnProperty("getPrototypeOf");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(Object, "getPrototypeOf", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);
