/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-3-23.js
 * @description Array.prototype.reduceRight uses inherited valueOf method when 'length' is an object with an own toString and inherited valueOf methods
 */


function testcase() {

        var testResult1 = true;
        var testResult2 = false;
        var valueOfAccessed = false;
        var toStringAccessed = false;

        var proto = {
            valueOf: function () {
                valueOfAccessed = true;
                return 2;
            }
        };
        var Con = function () { };
        Con.prototype = proto;
        var child = new Con();

        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx > 1) {
                testResult1 = false;
            }

            if (idx === 1) {
                testResult2 = true;
            }
            return false;
        }

        child.toString = function () {
            toStringAccessed = true;
            return '1';
        };

        var obj = {
            0: 12,
            1: 11,
            2: 9,
            length: child
        };

        Array.prototype.reduceRight.call(obj, callbackfn, 1);
        return testResult1 && testResult2 && valueOfAccessed && !toStringAccessed;
    }
runTestCase(testcase);
