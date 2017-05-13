/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-c-ii-8.js
 * @description Array.prototype.reduceRight - element changed by callbackfn on previous iterations is observed
 */


function testcase() {

        var accessed = false;
        var obj = { 0: 11, 1: 12, length: 2 };
        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            if (idx === 1) {
                obj[idx - 1] = 8;
            }
            return curVal > 10;
        }

        return Array.prototype.reduceRight.call(obj, callbackfn, 1) === false && accessed;
    }
runTestCase(testcase);
