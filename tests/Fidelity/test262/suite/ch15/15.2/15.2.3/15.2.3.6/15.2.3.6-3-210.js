/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-210.js
 * @description Object.defineProperty - 'get' property in 'Attributes' is own data property that overrides an inherited accessor property (8.10.5 step 7.a)
 */


function testcase() {
        var obj = {};
        var proto = {};
        var fun = function () {
            return "inheritedAccessorProperty";
        };
        Object.defineProperty(proto, "get", {
            get: function () {
                return fun;
            }
        });

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;

        var child = new ConstructFun();
        Object.defineProperty(child, "get", {
            value: function () {
                return "ownDataProperty";
            }
        });

        Object.defineProperty(obj, "property", child);

        return obj.property === "ownDataProperty";
    }
runTestCase(testcase);
