/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-105.js
 * @description Object.defineProperties - 'P' is accessor property, P.[[Set]] is present and properties.[[Set]] is undefined (8.12.9 step 12)
 */


function testcase() {
        var obj = {};
        function get_func() {
            return 10;
        }
        function set_func() {
            return 10;
        }

        Object.defineProperty(obj, "property", {
            get: get_func,
            set: set_func,
            enumerable: true,
            configurable: true
        });

        Object.defineProperties(obj, {
            property: {
                set: undefined
            }
        });

        var hasProperty = obj.hasOwnProperty("property");
        var verifyGet = false;
        verifyGet = (obj.property === 10);

        var verifySet = false;
        var desc = Object.getOwnPropertyDescriptor(obj, "property");
        verifySet = (typeof desc.set === 'undefined');

        var verifyEnumerable = false;
        for (var p in obj) {
            if (p === "property") {
                verifyEnumerable = true;
            }
        }

        var verifyConfigurable = false;
        delete obj.property;
        verifyConfigurable = obj.hasOwnProperty("property");

        return hasProperty && verifyGet && verifySet && verifyEnumerable && !verifyConfigurable;
    }
runTestCase(testcase);
