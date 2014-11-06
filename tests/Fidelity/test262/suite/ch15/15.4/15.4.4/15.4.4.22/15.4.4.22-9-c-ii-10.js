/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-c-ii-10.js
 * @description Array.prototype.reduceRight - callbackfn is called with 1 formal parameter
 */


function testcase() {

        var called = 0;

        function callbackfn(prevVal) {
            called++;
            return prevVal;
        }

        return [11, 12].reduceRight(callbackfn, 100) === 100 && 2 === called;
    }
runTestCase(testcase);
