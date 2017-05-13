/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-15.js
 * @description Array.prototype.lastIndexOf - value of 'length' is a string containing an exponential number
 */


function testcase() {

        var obj = {229: 229, 230: 2.3E2, length: "2.3E2"};

        return Array.prototype.lastIndexOf.call(obj, 229) === 229 &&
            Array.prototype.lastIndexOf.call(obj, 2.3E2) === -1;
    }
runTestCase(testcase);
