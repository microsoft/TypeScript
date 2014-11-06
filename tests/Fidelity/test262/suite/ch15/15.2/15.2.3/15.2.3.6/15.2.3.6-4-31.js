/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-31.js
 * @description Object.defineProperty - 'name' is own accessor property without a get function that overrides an inherited accessor property(8.12.9 step 1)
 */


function testcase() {
        var proto = {};
        Object.defineProperty(proto, "foo", {
            get: function () { },
            configurable: true
        });

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;
        var obj = new ConstructFun();
        Object.defineProperty(obj, "foo", {
            set: function () { },
            configurable: false
        });

        try {
            Object.defineProperty(obj, "foo", {
                configurable: true
            });
            return false;
        } catch (e) {
            return e instanceof TypeError;
        }
    }
runTestCase(testcase);
