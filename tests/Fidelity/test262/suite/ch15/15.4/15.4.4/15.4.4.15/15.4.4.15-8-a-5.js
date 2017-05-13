/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-a-5.js
 * @description Array.prototype.lastIndexOf -  deleted properties of step 5 are visible here on an Array-like object
 */


function testcase() {

        var arr = { 10: false, length: 30 };

        var fromIndex = {
            valueOf: function () {
                delete arr[10];
                return 15;
            }
        };

        return -1 === Array.prototype.lastIndexOf.call(arr, false, fromIndex);
    }
runTestCase(testcase);
