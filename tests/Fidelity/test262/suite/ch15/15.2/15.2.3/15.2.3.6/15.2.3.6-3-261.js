/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-261.js
 * @description Object.defineProperty - value of 'set' property in 'Attributes' is undefined (8.10.5 step 8.b)
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "property", {
            set: undefined
        });

        obj.property = "overrideData";
        var desc = Object.getOwnPropertyDescriptor(obj, "property");
        return obj.hasOwnProperty("property") && typeof obj.property === "undefined" &&
            typeof desc.set === "undefined";
    }
runTestCase(testcase);
