/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-408.js
 * @description ES5 Attributes - Successfully add a property to an object when the object's prototype has a property with same name and [[Writable]] attribute is set to true (Date instance)
 */


function testcase() {
        try {
            Object.defineProperty(Date.prototype, "prop", {
                value: 1001,
                writable: true,
                enumerable: true,
                configurable: true
            });
            var dateObj = new Date();
            dateObj.prop = 1002;

            return dateObj.hasOwnProperty("prop") && dateObj.prop === 1002;
        } finally {
            delete Date.prototype.prop;
        }
    }
runTestCase(testcase);
