/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-34.js
 * @description Object.defineProperties - 'P' doesn't exist in 'O', test [[Set]] of 'P' is set as undefined value if absent in accessor descriptor 'desc' (8.12.9 step 4.b.i)
 */


function testcase() {
        var obj = {};
        var getFunc = function () {
            return 10; 
        };

        Object.defineProperties(obj, {
            prop: {
                get: getFunc,
                enumerable: true,
                configurable: true
            }
        });

        var desc = Object.getOwnPropertyDescriptor(obj, "prop");
        return obj.hasOwnProperty("prop") && typeof (desc.set) === "undefined";

    }
runTestCase(testcase);
