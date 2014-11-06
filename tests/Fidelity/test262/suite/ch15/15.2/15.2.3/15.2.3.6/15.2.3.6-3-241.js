/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-241.js
 * @description Object.defineProperty - 'set' property in 'Attributes' is own accessor property (8.10.5 step 8.a)
 */


function testcase() {
        var obj = {};
        var data = "data";
        var attributes = {};
        Object.defineProperty(attributes, "set", {
            get: function () {
                return function (value) {
                    data = value;
                };
            }
        });

        Object.defineProperty(obj, "property", attributes);
        obj.property = "ownAccessorProperty";

        return obj.hasOwnProperty("property") && data === "ownAccessorProperty";
    }
runTestCase(testcase);
