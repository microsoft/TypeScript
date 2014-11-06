/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-1-6.js
 * @description Array.prototype.reduceRight applied to Number object
 */


function testcase() {

        var obj = new Number(-128);
        obj.length = 2;
        obj[0] = 11;
        obj[1] = 12;
        var accessed = false;

        function callbackfn(prevVal, curVal, idx, o) {
            accessed = true;
            return o instanceof Number;
        }

        return Array.prototype.reduceRight.call(obj, callbackfn, 11) && accessed;
    }
runTestCase(testcase);
