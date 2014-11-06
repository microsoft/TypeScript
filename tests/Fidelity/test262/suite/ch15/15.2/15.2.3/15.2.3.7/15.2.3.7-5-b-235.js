/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-5-b-235.js
 * @description Object.defineProperties - 'set' property of 'descObj' is own accessor property that overrides an inherited accessor property (8.10.5 step 8.a)
 */


function testcase() {
        var data1 = "data";
        var data2 = "data";

        var proto = {};
        Object.defineProperty(proto, "set", {
            get: function () {
                return function (value) {
                    data1 = value;
                };
            }
        });

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        Object.defineProperty(child, "set", {
            get: function () {
                return function (value) {
                    data2 = value;
                };
            }
        });

        var obj = {};

        Object.defineProperties(obj, {
            prop: child
        });

        obj.prop = "overrideData";

        return obj.hasOwnProperty("prop") && data2 === "overrideData" && data1 === "data";
    }
runTestCase(testcase);
