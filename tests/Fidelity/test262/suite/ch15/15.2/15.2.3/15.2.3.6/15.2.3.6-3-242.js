/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-242.js
 * @description Object.defineProperty - 'set' property in 'Attributes' is an inherited accessor property (8.10.5 step 8.a)
 */


function testcase() {
        var obj = {};
        var proto = {};
        var data = "data";
        Object.defineProperty(proto, "set", {
            get: function () {
                return function (value) {
                    data = value;
                };
            }
        });

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;

        var child = new ConstructFun();

        Object.defineProperty(obj, "property", child);
        obj.property = "inheritedAccessorProperty";

        return obj.hasOwnProperty("property") && data === "inheritedAccessorProperty";
    }
runTestCase(testcase);
