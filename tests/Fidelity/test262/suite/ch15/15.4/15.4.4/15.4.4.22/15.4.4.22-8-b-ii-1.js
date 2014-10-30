/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-8-b-ii-1.js
 * @description Array.prototype.reduceRight - added properties in step 2 are visible here
 */


function testcase() {

        var obj = {};

        function callbackfn(prevVal, curVal, idx, obj) { }

        Object.defineProperty(obj, "length", {
            get: function () {
                obj[2] = "accumulator";
                return 3;
            },
            configurable: true
        });

        return Array.prototype.reduceRight.call(obj, callbackfn) === "accumulator";
    }
runTestCase(testcase);
