/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-4-8.js
 * @description Array.prototype.reduceRight - side effects produced by step 2 are visible when an exception occurs
 */


function testcase() {

        var obj = { 0: 11, 1: 12 };

        var accessed = false;

        Object.defineProperty(obj, "length", {
            get: function () {
                accessed = true;
                return 2;
            },
            configurable: true
        });

        try {
            Array.prototype.reduceRight.call(obj, null);
            return false;
        } catch (ex) {
            return ex instanceof TypeError && accessed;
        }
    }
runTestCase(testcase);
