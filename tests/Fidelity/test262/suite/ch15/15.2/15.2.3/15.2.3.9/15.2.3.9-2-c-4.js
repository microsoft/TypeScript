/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-c-4.js
 * @description Object.freeze - all own properties of 'O' are not writable and not configurable
 */


function testcase() {
        var obj = {};
        var resultSetFun = false;

        Object.defineProperty(obj, "foo1", {
            value: 10,
            writable: false,
            enumerable: true,
            configurable: false
        });

        function get_func() {
            return 10;
        }

        function set_func() {
            resultSetFun = true;
        }

        Object.defineProperty(obj, "foo2", {
            get: get_func,
            set: set_func,
            enumerable: true,
            configurable: true
        });

        Object.freeze(obj);

        var res1 = obj.hasOwnProperty("foo2");
        delete obj.foo2;
        var res2 = obj.hasOwnProperty("foo2");
        var resultConfigurable = (res1 && res2);

        var resultGetFun = (obj.foo2 === 10);
        obj.foo2 = 12;

        var resultEnumerable = false;
        for (var prop in obj) {
            if (prop === "foo2") {
                resultEnumerable = true;
            }
        }

        var desc1 = Object.getOwnPropertyDescriptor(obj, "foo1");
        var desc2 = Object.getOwnPropertyDescriptor(obj, "foo2");

        var result = resultConfigurable && resultEnumerable && resultGetFun && resultSetFun;

        return dataPropertyAttributesAreCorrect(obj, "foo1", 10, false, true, false) &&
            result && desc1.configurable === false && desc1.writable === false && desc2.configurable === false;
    }
runTestCase(testcase);
