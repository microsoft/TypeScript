/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-c-ii-14.js
 * @description Array.prototype.reduceRight - callbackfn uses arguments
 */


function testcase() {

        function callbackfn() {
            return arguments[0] === 100 && arguments[3][arguments[2]] === arguments[1];
        }

        return [11].reduceRight(callbackfn, 100) === true;
    }
runTestCase(testcase);
