/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-5-b-230.js
 * @description Object.defineProperties - 'set' property of 'descObj' is own data property that overrides an inherited data property (8.10.5 step 8.a)
 */


function testcase() {
        var data1 = "data";
        var data2 = "data";
        var proto = {
            set: function (value) {
                data2 = value;
            }
        };

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        child.set = function (value) {
            data1 = value;
        };

        var obj = {};

        Object.defineProperties(obj, {
            prop: child
        });

        obj.prop = "overrideData";

        return obj.hasOwnProperty("prop") && data1 === "overrideData" && data2 === "data";
    }
runTestCase(testcase);
