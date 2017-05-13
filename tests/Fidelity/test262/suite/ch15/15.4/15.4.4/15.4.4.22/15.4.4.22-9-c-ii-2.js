/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-c-ii-2.js
 * @description Array.prototype.reduceRight - callbackfn called with correct parameters (initialvalue passed)
 */


function testcase() {
        var bParCorrect = false;
        var arr = [0, 1, true, null, new Object(), "five"];
        var initialValue = 5.5;

        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === obj.length - 1 && obj[idx] === curVal && prevVal === initialValue)
                return curVal;
            else if (idx + 1 < obj.length && obj[idx] === curVal && obj[idx + 1] === prevVal)
                return curVal;
            else
                return false;
        }
        return arr.reduceRight(callbackfn, initialValue) === 0;
    }
runTestCase(testcase);
