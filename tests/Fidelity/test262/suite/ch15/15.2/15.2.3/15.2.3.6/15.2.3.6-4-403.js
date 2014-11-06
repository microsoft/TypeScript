/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-403.js
 * @description ES5 Attributes - Successfully add a property to an object when the object's prototype has a property with same name and [[Writable]] attribute is set to true (Array instance)
 */


function testcase() {
        try {
            Object.defineProperty(Array.prototype, "prop", {
                value: 1001,
                writable: true,
                enumerable: true,
                configurable: true
            });
            var arrObj = [];
            arrObj.prop = 1002;

            return arrObj.hasOwnProperty("prop") && arrObj.prop === 1002;
        } finally {
            delete Array.prototype.prop;
        }
    }
runTestCase(testcase);
