/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-c-2.js
 * @description Object.freeze - The [[Configurable]] attribute of own accessor property of 'O' is set to false while other attributes are unchanged
 */


function testcase() {
        var obj = {};

        function get_func() {
            return 10;
        }

        var resultSetFun = false;
        function set_func() {
            resultSetFun = true;
        }

        Object.defineProperty(obj, "foo", {
            get: get_func,
            set: set_func,
            enumerable: true,
            configurable: true
        });

        Object.freeze(obj);
        var res1 = obj.hasOwnProperty("foo");
        delete obj.foo;
        var res2 = obj.hasOwnProperty("foo");
        var resultConfigurable = (res1 && res2);

        var resultGetFun = (obj.foo === 10);
        obj.foo = 12;

        var resultEnumerable = false;
        for (var prop in obj) {
            if (prop === "foo") {
                resultEnumerable = true;
            }
        }

        var desc = Object.getOwnPropertyDescriptor(obj, "foo");
        var result = resultConfigurable && resultEnumerable && resultGetFun && resultSetFun;

        return desc.configurable === false && result;
    }
runTestCase(testcase);
