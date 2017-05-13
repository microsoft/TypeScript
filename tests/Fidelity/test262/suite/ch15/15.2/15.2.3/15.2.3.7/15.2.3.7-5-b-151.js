/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-5-b-151.js
 * @description Object.defineProperties - 'descObj' is a Function object which implements its own [[Get]] method to get 'writable' property (8.10.5 step 6.a)
 */


function testcase() {
        var obj = {};

        var func = function (a, b) {
            return a + b;
        };

        func.writable = false;

        Object.defineProperties(obj, {
            property: func
        });

        obj.property = "isWritable";

        return obj.hasOwnProperty("property") && typeof (obj.property) === "undefined";
    }
runTestCase(testcase);
