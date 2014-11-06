/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-c-ii-5.js
 * @description Array.prototype.reduce - k values are accessed during each iteration and not prior to starting the loop on an Array
 */


function testcase() {

        var result = true;
        var kIndex = [];
        var called = 0;

        //By below way, we could verify that k would be setted as 0, 1, ..., length - 1 in order, and each value will be setted one time.
        function callbackfn(prevVal, curVal, idx, obj) {
            //Each position should be visited one time, which means k is accessed one time during iterations.
            called++;
            if (typeof kIndex[idx] === "undefined") {
                //when current position is visited, its previous index should has been visited.
                if (idx !== 0 && typeof kIndex[idx - 1] === "undefined") {
                    result = false;
                }
                kIndex[idx] = 1;
            } else {
                result = false;
            }
        }

        [11, 12, 13, 14].reduce(callbackfn, 1);

        return result && called === 4;
    }
runTestCase(testcase);
