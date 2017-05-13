/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-599.js
 * @description ES5 Attributes - all attributes in Object.getOwnPropertyDescriptor are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Object, "getOwnPropertyDescriptor");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = Object.getOwnPropertyDescriptor;

        try {
            Object.getOwnPropertyDescriptor = "2010";

            var isWritable = (Object.getOwnPropertyDescriptor === "2010");

            var isEnumerable = false;

            for (var prop in Object) {
                if (prop === "getOwnPropertyDescriptor") {
                    isEnumerable = true;
                }
            }

            delete Object.getOwnPropertyDescriptor;

            var isConfigurable = !Object.hasOwnProperty("getOwnPropertyDescriptor");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(Object, "getOwnPropertyDescriptor", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);
