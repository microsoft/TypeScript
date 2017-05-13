/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-574.js
 * @description ES5 Attributes - [[Set]] attribute is a function which has two arguments
 */


function testcase() {
        var obj = {};
        var firstArg = 12;
        var secondArg = 12;

        var setFunc = function (a, b) {
            firstArg = a;
            secondArg = b;
        };
        Object.defineProperty(obj, "prop", {
            set: setFunc
        });
        obj.prop = 100;
        var desc = Object.getOwnPropertyDescriptor(obj, "prop");

        return obj.hasOwnProperty("prop") && desc.set === setFunc && firstArg === 100 && typeof secondArg === "undefined";
    }
runTestCase(testcase);
