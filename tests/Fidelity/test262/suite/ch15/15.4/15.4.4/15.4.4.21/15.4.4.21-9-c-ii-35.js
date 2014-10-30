/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-c-ii-35.js
 * @description Array.prototype.reduce - the Arguments object can be used as accumulator
 */


function testcase() {

        var accessed = false;
        var arg;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            return prevVal === arg;
        }

        var obj = { 0: 11, length: 1 };

        (function fun() {
            arg = arguments;
        }(10, 11, 12, 13));

        return Array.prototype.reduce.call(obj, callbackfn, arg) === true && accessed;
    }
runTestCase(testcase);
