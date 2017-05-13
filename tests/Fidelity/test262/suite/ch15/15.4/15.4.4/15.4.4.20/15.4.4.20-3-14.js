/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-3-14.js
 * @description Array.prototype.filter - 'length' is a string containing +/-Infinity
 */


function testcase() {

        var accessed1 = false;
        var accessed2 = false;
        var accessed3 = false;

        function callbackfn1(val, idx, obj) {
            accessed1 = true;
            return true;
        }

        function callbackfn2(val, idx, obj) {
            accessed2 = true;
            return true;
        }

        function callbackfn3(val, idx, obj) {
            accessed3 = true;
            return true;
        }

        var obj1 = { 0: 9, length: "Infinity" };
        var obj2 = { 0: 9, length: "-Infinity" };
        var obj3 = { 0: 9, length: "+Infinity" };

        var newArr1 = Array.prototype.filter.call(obj1, callbackfn1);
        var newArr2 = Array.prototype.filter.call(obj2, callbackfn2);
        var newArr3 = Array.prototype.filter.call(obj3, callbackfn3);

        return !accessed1 && newArr1.length === 0 &&
            !accessed2 && newArr2.length === 0 && 
            !accessed3 && newArr3.length === 0;
    }
runTestCase(testcase);
