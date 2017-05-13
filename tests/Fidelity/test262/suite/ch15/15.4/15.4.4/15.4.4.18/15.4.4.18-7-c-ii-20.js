/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-ii-20.js
 * @description Array.prototype.forEach - callbackfn called with correct parameters (thisArg is correct)
 */


function testcase() {

        var result = false;
        function callbackfn(val, idx, obj) {
            result = (10 === this.threshold);
        }

        var thisArg = { threshold: 10 };

        var obj = { 0: 11, length: 1 };

        Array.prototype.forEach.call(obj, callbackfn, thisArg);
        return result;
    }
runTestCase(testcase);
