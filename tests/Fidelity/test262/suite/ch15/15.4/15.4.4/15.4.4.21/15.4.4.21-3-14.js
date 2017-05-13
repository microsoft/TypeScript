/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-3-14.js
 * @description Array.prototype.reduce - 'length' is a string containing +/-Infinity
 */


function testcase() {

        var accessed1 = false;
        var accessed2 = false;
        var accessed3 = false;

        function callbackfn1(prevVal, curVal, idx, obj) {
            accessed1 = true;
            return 2;
        }

        function callbackfn2(prevVal, curVal, idx, obj) {
            accessed2 = true;
            return 2;
        }

        function callbackfn3(prevVal, curVal, idx, obj) {
            accessed3 = true;
            return 2;
        }

        var obj1 = { 0: 9, length: "Infinity" };
        var obj2 = { 0: 9, length: "-Infinity" };
        var obj3 = { 0: 9, length: "+Infinity" };

        return Array.prototype.reduce.call(obj1, callbackfn1, 1) === 1 &&
            Array.prototype.reduce.call(obj2, callbackfn2, 1) === 1 &&
            Array.prototype.reduce.call(obj3, callbackfn3, 1) === 1 &&
            !accessed1 && !accessed2 && !accessed3;
    }
runTestCase(testcase);
