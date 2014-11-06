/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-2-17.js
 * @description Array.prototype.reduceRight applied to the Arguments object, which implements its own property get method
 */


function testcase() {

        var arg;
        var accessed = false;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            return obj.length === 2;
        }

        var func = function (a, b) {
            arg = arguments;
            return Array.prototype.reduceRight.call(arguments, callbackfn, 11);
        };

        return func(12, 11) && accessed;
    }
runTestCase(testcase);
