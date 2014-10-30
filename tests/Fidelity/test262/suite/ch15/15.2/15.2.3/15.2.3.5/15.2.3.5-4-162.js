/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-162.js
 * @description Object.create - 'value' property of one property in 'Properties' is own accessor property without a get function (8.10.5 step 5.a)
 */


function testcase() {

        var descObj = {};

        Object.defineProperty(descObj, "value", {
            set: function () { }
        });

        var newObj = Object.create({}, {
            prop: descObj
        });

        return newObj.hasOwnProperty("prop") && typeof (newObj.prop) === "undefined";
    }
runTestCase(testcase);
