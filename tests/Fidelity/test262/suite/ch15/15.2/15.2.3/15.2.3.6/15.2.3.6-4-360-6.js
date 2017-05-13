/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-360-6.js
 * @description ES5 Attributes - Updating indexed data property 'P' whose attributes are [[Writable]]: false, [[Enumerable]]: true, [[Configurable]]: true to an accessor property, 'O' is an Arguments object (8.12.9 - step 9.b.i)
 */


function testcase() {
        var obj = (function () {
            return arguments;
        }());

        Object.defineProperty(obj, "0", {
            value: 2010,
            writable: false,
            enumerable: true,
            configurable: true
        });
        var desc1 = Object.getOwnPropertyDescriptor(obj, "0");

        function getFunc() {
            return 20;
        }
        Object.defineProperty(obj, "0", {
            get: getFunc
        });
        var desc2 = Object.getOwnPropertyDescriptor(obj, "0");

        return desc1.hasOwnProperty("value") && desc2.hasOwnProperty("get") &&
            desc2.enumerable === true && desc2.configurable === true &&
            obj[0] === 20 && typeof desc2.set === "undefined" && desc2.get === getFunc;
    }
runTestCase(testcase);
