/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-54.js
 * @description Object.defineProperty - 'name' property doesn't exist in 'O', test [[Set]] of 'name' property of 'Attributes' is set as undefined value if absent in accessor descriptor 'desc' (8.12.9 step 4.b.i)
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "property", {
            get: function () {
                return "property";
            },
            enumerable: false,
            configurable: false
        });


        if (obj.property !== "property") {
            return false;
        }
        var desc = Object.getOwnPropertyDescriptor(obj, "property");
        if (typeof desc.set !== "undefined") {
            return false;
        }
        for (var p in obj) {
            if (p === "property") {
                return false;
            }
        }
        delete obj.property;
        if (!obj.hasOwnProperty("property")) {
            return false;
        }

        return true;
    }
runTestCase(testcase);
