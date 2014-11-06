/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-16.js
 * @description Array.prototype.lastIndexOf - value of 'length' is a string which is able to be converted into hex number
 */


function testcase() {

        var obj = { 2573: 2573, 2574: 0x000A0E, length: "0x000A0E" };

        return Array.prototype.lastIndexOf.call(obj, 2573) === 2573 &&
            Array.prototype.lastIndexOf.call(obj, 0x000A0E) === -1;
    }
runTestCase(testcase);
