/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-7-c-ii-5.js
 * @description Array.prototype.some - k values are accessed during each iteration and not prior to starting the loop
 */


function testcase() {

        var kIndex = [];

        //By below way, we could verify that k would be setted as 0, 1, ..., length - 1 in order, and each value will be setted one time.
        function callbackfn(val, idx, obj) {
            //Each position should be visited one time, which means k is accessed one time during iterations.
            if (typeof kIndex[idx] === "undefined") {
                //when current position is visited, its previous index should has been visited.
                if (idx !== 0 && typeof kIndex[idx - 1] === "undefined") {
                    return true;
                }
                kIndex[idx] = 1;
                return false;
            } else {
                return true;
            }
        }

        return ![11, 12, 13, 14].some(callbackfn, undefined);
    }
runTestCase(testcase);
