/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-3-15.js
 * @description Array.prototype.indexOf - 'length' is a string containing an exponential number
 */


function testcase() {

        var obj = { 1: true, 2: "2E0", length: "2E0" };

        return Array.prototype.indexOf.call(obj, true) === 1 &&
        Array.prototype.indexOf.call(obj, "2E0") === -1;
    }
runTestCase(testcase);
