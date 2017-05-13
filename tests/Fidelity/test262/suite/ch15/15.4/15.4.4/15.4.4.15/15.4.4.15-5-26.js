/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-26.js
 * @description Array.prototype.lastIndexOf - side effects produced by step 2 are visible when an exception occurs
 */


function testcase() {

        var stepTwoOccurs = false;
        var stepFiveOccurs = false;
        var obj = {};

        Object.defineProperty(obj, "length", {
            get: function () {
                stepTwoOccurs = true;
                if (stepFiveOccurs) {
                    throw new Error("Step 5 occurred out of order");
                }
                return 20;
            },
            configurable: true
        });

        var fromIndex = {
            valueOf: function () {
                stepFiveOccurs = true;
                return 0;
            }
        };

        try {
            Array.prototype.lastIndexOf.call(obj, undefined, fromIndex);
            return stepTwoOccurs && stepFiveOccurs;
        } catch (ex) {
            return false;
        }
    }
runTestCase(testcase);
