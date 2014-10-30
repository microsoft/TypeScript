/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-iii-1-6.js
 * @description Array.prototype.filter - values of 'to' are accessed during each iteration when 'selected' is converted to true and not prior to starting the loop
 */


function testcase() {

        var toIndex = [];
        var called = 0;

        //By below way, we could verify that 'to' would be setted as 0, 1, ..., length - 1 in order, and each value will be setted one time.
        function callbackfn(val, idx, obj) {
            called++;
            //Each position should be visited one time, which means 'to' is accessed one time during iterations.
            if (toIndex[idx] === undefined) {
                //when current position is visited, its previous index should has been visited.
                if (idx !== 0 && toIndex[idx - 1] === undefined) {
                    return false;
                }
                toIndex[idx] = 1;
                return true;
            } else {
                return false;
            }
        }
        var newArr = [11, 12, 13, 14].filter(callbackfn, undefined);

        return newArr.length === 4 && called === 4;
    }
runTestCase(testcase);
