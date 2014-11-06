/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-1-6.js
 * @description Array.prototype.filter applied to Number object
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            return obj instanceof Number;
        }

        var obj = new Number(-128);
        obj.length = 2;
        obj[0] = 11;
        obj[1] = 12;

        var newArr = Array.prototype.filter.call(obj, callbackfn);
        return newArr[0] === 11 && newArr[1] === 12;
    }
runTestCase(testcase);
