/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-2-7.js
 * @description Array.prototype.indexOf - 'length' is own accessor property
 */


function testcase() {
        var objOne = { 1: true };
        var objTwo = { 2: true };
        Object.defineProperty(objOne, "length", {
            get: function () {
                return 2;
            },
            configurable: true
        });
        Object.defineProperty(objTwo, "length", {
            get: function () {
                return 2;
            },
            configurable: true
        });

        return Array.prototype.indexOf.call(objOne, true) === 1 &&
            Array.prototype.indexOf.call(objTwo, true) === -1;
    }
runTestCase(testcase);
