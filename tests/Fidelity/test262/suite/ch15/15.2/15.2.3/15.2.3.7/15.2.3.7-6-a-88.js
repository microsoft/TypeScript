/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-88.js
 * @description Object.defineProperties throws TypeError when P.configurable is false, P.[[Set]] is undefined, properties.[[Set]] refers to an objcet (8.12.9 step 11.a.i)
 */


function testcase() {

        var obj = {};

        function get_Func() {
            return 0;
        }

        Object.defineProperty(obj, "foo", {
            set: undefined,
            get: get_Func,
            enumerable: false,
            configurable: false
        });

        function set_Func() { }

        try {
            Object.defineProperties(obj, {
                foo: {
                    set: set_Func
                }
            });
            return false;
        } catch (e) {
            var verifyEnumerable = false;
            for (var p in obj) {
                if (p === "foo") {
                    verifyEnumerable = true;
                }
            }

            var desc = Object.getOwnPropertyDescriptor(obj, "foo");

            var verifyConfigurable = false;
            delete obj.foo;
            verifyConfigurable = obj.hasOwnProperty("foo");

            return e instanceof TypeError && !verifyEnumerable && verifyConfigurable && typeof (desc.set) === "undefined";
        }
    }
runTestCase(testcase);
