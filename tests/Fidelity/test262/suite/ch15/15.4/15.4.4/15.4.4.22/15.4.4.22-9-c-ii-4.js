/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-c-ii-4.js
 * @description Array.prototype.reduceRight - k values are passed in acending numeric order
 */


function testcase() {

        var arr = [0, 1, 2, 3, 4, 5];
        var lastIdx = arr.length - 1;
        var accessed = false;
        var result = true;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            if (lastIdx !== idx) {
                result = false;
            } else {
                lastIdx--;
            }
        }
        arr.reduceRight(callbackfn, 1);
        return result && accessed;
    }
runTestCase(testcase);
