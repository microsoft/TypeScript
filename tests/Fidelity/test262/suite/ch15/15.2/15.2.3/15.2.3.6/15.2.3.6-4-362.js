/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-362.js
 * @description ES5 Attributes - property ([[Writable]] is false, [[Enumerable]] is true, [[Configurable]] is false) is enumerable
 */


function testcase() {
        var obj = {};
        Object.defineProperty(obj, "prop", {
            value: 2010,
            writable: false,
            enumerable: true,
            configurable: false
        });
        var propertyDefineCorrect = obj.hasOwnProperty("prop");
        var desc = Object.getOwnPropertyDescriptor(obj, "prop");
        for (var property in obj) {
            if (property === "prop") {
                return propertyDefineCorrect && desc.enumerable === true;
            }
        }
        return false;
    }
runTestCase(testcase);
