/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-31.js
 * @description Object.defineProperty - 'enumerable' property in 'Attributes' is own accessor property(without a get function) that overrides an inherited accessor property (8.10.5 step 3.a)
 */


function testcase() {
        var obj = {};
        var accessed = false;
        var proto = {};

        Object.defineProperty(proto, "enumerable", {
            get: function () {
                return true;
            }
        });

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;

        var child = new ConstructFun();

        Object.defineProperty(child, "enumerable", {
            set: function () { }
        });

        Object.defineProperty(obj, "property", child);

        for (var prop in obj) {
            if (prop === "property") {
                accessed = true;
            }
        }
        return !accessed;
    }
runTestCase(testcase);
