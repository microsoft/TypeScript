/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-44.js
 * @description Object.defineProperties - both desc.value and P.value are NaN (8.12.9 step 6)
 */


function testcase() {

        var obj = {};

        var desc = { value: NaN };
        Object.defineProperty(obj, "foo", desc);

        Object.defineProperties(obj, {
            foo: {
                value: NaN
            }
        });

        var verifyEnumerable = false;
        for (var p in obj) {
            if (p === "foo") {
                verifyEnumerable = true;
            }
        }

        var verifyValue = false;
        obj.prop = "overrideData";
        verifyValue = obj.foo !== obj.foo && isNaN(obj.foo);

        var verifyConfigurable = false;
        delete obj.foo;
        verifyConfigurable = obj.hasOwnProperty("foo");

        return verifyConfigurable && !verifyEnumerable && verifyValue;
    }
runTestCase(testcase);
