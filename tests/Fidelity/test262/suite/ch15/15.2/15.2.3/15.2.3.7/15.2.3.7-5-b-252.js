/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-5-b-252.js
 * @description Object.defineProperties - value of 'set' property of 'descObj' is undefined (8.10.5 step 8.b)
 */


function testcase() {

        var getFun = function () {
            return 11;
        };

        var obj = {};
        Object.defineProperties(obj, {
            prop: {
                get: getFun,
                set: undefined
            }
        });

        try {
            var desc = Object.getOwnPropertyDescriptor(obj, "prop");
            return obj.hasOwnProperty("prop") && typeof (desc.set) === "undefined";
        } catch (e) {
            return false;
        }
    }
runTestCase(testcase);
