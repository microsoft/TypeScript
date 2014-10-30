/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-1.js
 * @description Array.prototype.reduceRight doesn't consider new elements which index is larger than array original length added to array after it is called, consider new elements which index is smaller than array length
 */


function testcase() {
        function callbackfn(prevVal, curVal, idx, obj) {
            arr[5] = 6;
            arr[2] = 3;
            return prevVal + curVal;
        }

        var arr = ['1', 2, , 4, '5'];
        return arr.reduceRight(callbackfn) === "54321";
    }
runTestCase(testcase);
