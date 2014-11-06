/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-175-1.js
 * @description Object.defineProperty - 'Attributes' is an Arguments object which implements its own [[Get]] method to access the 'writable' property of prototype object (8.10.5 step 6.b)
 */


function testcase() {
        var obj = {};
        try {
            Object.prototype.writable = true;

            var argObj = (function () { return arguments; })();

            Object.defineProperty(obj, "property", argObj);

            var beforeWrite = obj.hasOwnProperty("property");

            obj.property = "isWritable";

            var afterWrite = (obj.property === "isWritable");

            return beforeWrite === true && afterWrite === true;
        } finally {
            delete Object.prototype.writable;
        }
    }
runTestCase(testcase);
