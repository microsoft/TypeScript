/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-5-16.js
 * @description Array.prototype.indexOf - value of 'fromIndex' is a string containing Infinity
 */


function testcase() {
        var arr = [];
        arr[Math.pow(2, 32) - 2] = true; //length is the max value of Uint type
        return arr.indexOf(true, "Infinity") === -1;
    }
runTestCase(testcase);
