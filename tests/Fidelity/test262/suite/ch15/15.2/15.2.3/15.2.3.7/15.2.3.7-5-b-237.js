/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-5-b-237.js
 * @description Object.defineProperties - 'set' property of 'descObj' is own accessor property without a get function that overrides an inherited accessor property (8.10.5 step 8.a)
 */


function testcase() {

        var fun = function () {
            return 10; 
        };
        var proto = {};
        Object.defineProperty(proto, "set", {
            get: function () {
                return function () {
                    return arguments;
                };
            }
        });

        var Con = function () { };
        Con.prototype = proto;

        var descObj = new Con();
        Object.defineProperty(descObj, "set", {
            set: function () { }
        });

        descObj.get = fun;

        var obj = {};

        Object.defineProperties(obj, {
            prop: descObj
        });

        var desc = Object.getOwnPropertyDescriptor(obj, "prop");

        return obj.hasOwnProperty("prop") && typeof (desc.set) === "undefined" && obj.prop === 10;
    }
runTestCase(testcase);
