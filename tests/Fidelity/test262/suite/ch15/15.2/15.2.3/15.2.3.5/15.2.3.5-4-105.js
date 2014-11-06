/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-105.js
 * @description Object.create - 'configurable' property of one property in 'Properties' is own accessor property (8.10.5 step 4.a)
 */


function testcase() {

        var descObj = {};
        Object.defineProperty(descObj, "configurable", {
            get: function () {
                return true;
            }
        });

        var newObj = Object.create({}, {
            prop: descObj 
        });
        var result1 = newObj.hasOwnProperty("prop");
        delete newObj.prop;
        var result2 = newObj.hasOwnProperty("prop");

        return result1 === true && result2 === false;
    }
runTestCase(testcase);
