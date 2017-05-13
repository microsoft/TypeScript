/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-a-4.js
 * @description Object.freeze - 'P' is own accessor property
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "foo", {
            get: function () {
                return 10;
            },
            configurable: true
        });

        Object.freeze(obj);

        var desc = Object.getOwnPropertyDescriptor(obj, "foo");

        delete obj.foo;
        return obj.foo === 10 && desc.configurable === false;
    }
runTestCase(testcase);
