/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-4-12.js
 * @description Array.prototype.reduceRight - 'callbackfn' is a function
 */


function testcase() {

        var initialValue = 0;
        function callbackfn(accum, val, idx, obj) {
            accum += val;
            return accum;
        }

        return 20 === [11, 9].reduceRight(callbackfn, initialValue);
    }
runTestCase(testcase);
