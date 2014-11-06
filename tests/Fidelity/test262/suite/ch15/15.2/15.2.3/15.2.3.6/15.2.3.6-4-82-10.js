/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-82-10.js
 * @description Object.defineProperty - Update [[Configurable]] attribute of 'name' property to false successfully when [[Enumerable]] and [[Configurable]] attributes of 'name' property are true,  the 'desc' is a generic descriptor which contains [[Enumerable]] attribute as true and [[Configurable]] attribute is false, 'name' property is an accessor property (8.12.9 step 8)
 */


function testcase() {

        var obj = {};
        obj.verifySetFunction = "data";
        var get_func = function () {
            return obj.verifySetFunction;
        };
        var set_func = function (value) {
            obj.verifySetFunction = value;
        };
        Object.defineProperty(obj, "foo", {
            get: get_func,
            set: set_func,
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "foo", {
            enumerable: true,
            configurable: false
        });

        return accessorPropertyAttributesAreCorrect(obj, "foo", get_func, set_func, "verifySetFunction", true, false);
    }
runTestCase(testcase);
