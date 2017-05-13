/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-iii-2.js
 * @description Array.prototype.lastIndexOf returns without visiting subsequent element once search value is found
 */


function testcase() {
        var arr = [2, 1, , 1, 2];
        var elementFirstAccessed = false;
        var elementThirdAccessed = false;

        Object.defineProperty(arr, "2", {
            get: function () {
                elementThirdAccessed = true;
                return 2;
            },
            configurable: true
        });
        Object.defineProperty(arr, "0", {
            get: function () {
                elementFirstAccessed = true;
                return 2;
            },
            configurable: true
        });

        arr.lastIndexOf(2);
        return !elementThirdAccessed && !elementFirstAccessed;
    }
runTestCase(testcase);
