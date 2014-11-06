/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.12/15.2.3.12-3-28.js
 * @description Object.isFrozen returns true when all own properties of 'O' are not writable and not configurable, and 'O' is not extensible
 */


function testcase() {

        var obj = {};

        Object.defineProperty(obj, "foo1", {
            value: 20,
            writable: false,
            enumerable: false,
            configurable: false
        });


        function get_func() {
            return 10;
        }
        function set_func() { }

        Object.defineProperty(obj, "foo2", {
            get: get_func,
            set: set_func,
            configurable: false
        });

        Object.preventExtensions(obj);
        return Object.isFrozen(obj);

    }
runTestCase(testcase);
