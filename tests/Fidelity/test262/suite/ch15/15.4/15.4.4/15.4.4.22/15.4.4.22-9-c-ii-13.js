/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-c-ii-13.js
 * @description Array.prototype.reduceRight - callbackfn is called with 4 formal parameter
 */


function testcase() {

        var arr = [11, 12, 13];
        var initVal = 6.99;
        var testResult = false;

        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 2) {
                testResult = (prevVal === initVal);
            }
            return curVal > 10 && obj[idx] === curVal;
        }

        return arr.reduceRight(callbackfn, initVal) === true && testResult;
    }
runTestCase(testcase);
