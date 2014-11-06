/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-3-20.js
 * @description Array.prototype.reduceRight - value of 'length' is an Object which has an own valueOf method
 */


function testcase() {

        var testResult1 = true;
        var testResult2 = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx > 1) {
                testResult1 = false;
            }

            if (idx === 1) {
                testResult2 = true;
            }
            return false;
        }

        var valueOfAccessed = false;

        var obj = {
            0: 12,
            1: 11,
            2: 9,
            length: {
                valueOf: function () {
                    valueOfAccessed = true;
                    return 2;
                }
            }
        };

        Array.prototype.reduceRight.call(obj, callbackfn, 1);
        return testResult1 && testResult2 && valueOfAccessed;
    }
runTestCase(testcase);
